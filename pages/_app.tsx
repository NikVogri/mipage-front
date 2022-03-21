import type { AppContext, AppProps } from "next/app";
import { setIsMobileView } from "features/ui/uiSlice";
import { setAuthChecked, setUser } from "features/auth/authSlice";
import { Provider } from "react-redux";
import { PUBLIC_PATHS } from "config";
import { store } from "../store";
import { User } from "models";
import { useEffect } from "react";

import Layout from "../components/UI/Layout";
import App from "next/app";

import { ToastContainer } from "react-toastify";
import axios from "config/axios";

import "styles/globals.css";
import "styles/main.scss";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
function MyApp({ Component, pageProps, user }: AppProps & { user: User }) {
	const isClientSide = typeof window !== "undefined";

	useEffect(() => {
		if (user) {
			store.dispatch(setUser(user));
		} else {
			store.dispatch(setAuthChecked());
		}
	}, [user]);

	useEffect(() => {
		if (isClientSide) {
			store.dispatch(setIsMobileView(window.innerHeight < 768));
		}
	}, [isClientSide]);

	return (
		<Provider store={store}>
			<Layout>
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

	const requestedPath = appContext?.router.route;
	const isPageRequest = requestedPath.includes("/pages/[pageId]");
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
	} else if (!user && !PUBLIC_PATHS.includes(requestedPath)) {
		// Server side redirect if user is not logged in and trying to access auth only pages
		appContext.ctx.res?.writeHead(307, { Location: "/login" }).end();
	}

	return { ...appProps, user, page };
};

export default MyApp;
