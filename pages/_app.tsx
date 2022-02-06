import type { AppContext, AppProps } from "next/app";
import { setAuthChecked, setUser } from "features/auth/authSlice";
import { Provider } from "react-redux";
import { PUBLIC_PATHS } from "config";
import { store } from "../store";
import { User } from "models";
import { useEffect } from "react";

import Layout from "../components/UI/Layout";
import App from "next/app";

import axios from "config/axios";

import "styles/globals.css";
import "styles/main.scss";
import "../styles/globals.css";
function MyApp({ Component, pageProps, user }: AppProps & { user: User }) {
	useEffect(() => {
		if (user) {
			store.dispatch(setUser(user));
		} else {
			store.dispatch(setAuthChecked());
		}
	}, [user]);

	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

MyApp.getInitialProps = async (appContext: AppContext) => {
	const appProps = await App.getInitialProps(appContext);

	// return early if not on server and let the browser handle auth;
	if (process.browser) {
		return { ...appProps };
	}

	const requestedPath = appContext?.router.route;
	const cookies = appContext.ctx.req?.headers.cookie;

	let user;
	if (cookies?.includes("mipage-auth")) {
		try {
			const res = await axios.get(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/users/me`, {
				headers: {
					Cookie: appContext.ctx.req?.headers.cookie as string,
				},
			});

			user = res.data;
		} catch (err) {}
	}

	// Server side redirect if user is not logged in and trying to access auth only pages
	if (!user && !PUBLIC_PATHS.includes(requestedPath)) {
		appContext.ctx.res?.writeHead(307, { Location: "/login" });
		appContext.ctx.res?.end();
	}

	return { ...appProps, user };
};

export default MyApp;
