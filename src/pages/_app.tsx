import type { AppContext, AppProps } from "next/app";
import { setIsMobileView, togglePageSidebar } from "features/ui/uiSlice";
import { setAuthChecked, setUser } from "features/auth/authSlice";
import { Provider } from "react-redux";
import { isPagePublic } from "helpers/isPagePublic";
import { store } from "store";
import { User } from "models";
import { useEffect } from "react";

import Layout from "components/UI/Layout";
import CookieConsent from "react-cookie-consent";
import App from "next/app";

import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { logPageViewToGTag } from "helpers/googleTag";

import axios from "config/axios";

import "styles/globals.css";
import "styles/main.scss";
import "styles/globals.css";

import "react-toastify/dist/ReactToastify.css";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

function MyApp({ Component, pageProps, user }: AppProps & { user: User }) {
	const isClientSide = typeof window !== "undefined";
	const router = useRouter();

	function handleAccept() {
		(window as any)?.gtag("consent", "update", {
			ad_storage: "granted",
			analytics_storage: "granted",
		});
	}

	useEffect(() => {
		if (user) {
			store.dispatch(setUser(user));
		} else {
			store.dispatch(setAuthChecked());
		}
	}, [user]);

	useEffect(() => {
		if (isClientSide) {
			store.dispatch(setIsMobileView(window.innerWidth < 768));
		}

		const handleWindowResize = () => {
			if (window.innerWidth > 768 && !store.getState().ui.pageSidebarIsOpen) {
				store.dispatch(togglePageSidebar());
			}

			setIsMobileView(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleWindowResize);
		return () => window.removeEventListener("resize", handleWindowResize);
	}, [isClientSide]);

	useEffect(() => {
		if (checkConsented()) {
			(window as any)?.gtag("consent", "update", {
				ad_storage: "granted",
				analytics_storage: "granted",
			});
		}
	}, []);

	useEffect(() => {
		const handleRouteChange = (url: string) => {
			logPageViewToGTag(url);
		};
		//When the component is mounted, subscribe to router changes
		//and log those page views
		router.events.on("routeChangeComplete", handleRouteChange);

		// If the component is unmounted, unsubscribe
		// from the event with the `off` method
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);

	return (
		<Provider store={store}>
			<Layout>
				<CookieConsent
					buttonText="Accept"
					enableDeclineButton
					onAccept={() => {
						handleAccept();
					}}
					declineButtonText="Decline"
				>
					We use cookies to improve your experience on our site.
				</CookieConsent>
				<Component {...pageProps} />
				<ToastContainer
					position="top-center"
					autoClose={1500}
					newestOnTop
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					pauseOnHover
					className={`toast-container`}
				/>
			</Layout>
		</Provider>
	);
}

MyApp.getInitialProps = async (appContext: AppContext) => {
	const appProps = await App.getInitialProps(appContext);

	const requestedPath = appContext?.router.asPath;
	const isPageRequest = /\/pages\/[a-f0-9\-]{36}/.test(requestedPath);
	const cookies = appContext.ctx.req?.headers.cookie as string;
	const isSSRLoad = Boolean(appContext.ctx?.req);

	let user;
	if (cookies?.includes("mipage-auth")) {
		try {
			const res = await axios.get(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/users/me`, {
				headers: {
					Cookie: cookies,
				},
			});

			user = res.data;
		} catch (err) {}
	}

	let page;
	if (isPageRequest && isSSRLoad) {
		const pageId = appContext?.router.query.pageId;

		try {
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_BE_BASE_URL}/pages/${pageId}${!user ? "/public" : ""}`,
				{
					headers: {
						Cookie: cookies,
					},
				}
			);
			page = res.data;
		} catch (error: any) {
			if (error?.response?.data?.statusCode === 401 && !user) {
				appContext.ctx.res?.writeHead(307, { Location: "/login" }).end();
			}
		}
	} else if (!user && !isPagePublic(requestedPath)) {
		// Server side redirect if user is not logged in and trying to access auth only pages
		appContext.ctx.res?.writeHead(307, { Location: "/login" }).end();
	}

	return { ...appProps, user, page };
};

export default MyApp;

function checkConsented() {
	let decodedCookie = decodeURIComponent(document.cookie) as any;
	decodedCookie = decodedCookie.split(";") as string[];
	decodedCookie = decodedCookie.find((cookie: string) => {
		return cookie.substring(0, 13) === "CookieConsent";
	});
	if (!decodedCookie) {
		return false;
	}
	if (decodedCookie.substring(14, 18) === "true") {
		return true;
	}
	return false;
}
