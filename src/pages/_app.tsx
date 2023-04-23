import type { AppProps } from "next/app";
import { setIsMobileView, togglePageSidebar } from "features/ui/uiSlice";
import { Provider } from "react-redux";
import { store } from "store";
import { User } from "models";
import { useEffect } from "react";

import Layout from "components/UI/Layout";
import CookieConsent from "react-cookie-consent";

import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { logPageViewToGTag } from "helpers/googleTag";
import { initAuth } from "features/auth/authSlice";

import "styles/globals.css";
import "styles/main.scss";
import "styles/globals.css";

import "react-toastify/dist/ReactToastify.css";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

function MyApp({ Component, pageProps }: AppProps & { user: User }) {
	const isClientSide = typeof window !== "undefined";
	const router = useRouter();

	function handleAccept() {
		(window as any)?.gtag("consent", "update", {
			ad_storage: "granted",
			analytics_storage: "granted",
		});
	}

	useEffect(() => {
		store.dispatch(initAuth());

		if (checkConsented()) {
			(window as any)?.gtag("consent", "update", {
				ad_storage: "granted",
				analytics_storage: "granted",
			});
		}
	}, [store, checkConsented]);

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
