import type { AppProps } from "next/app";
import { setIsMobileView, togglePageSidebar } from "features/ui/uiSlice";
import { Provider } from "react-redux";
import { store } from "store";
import { User } from "models";
import { useEffect } from "react";

import Layout from "components/UI/Layout";

import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { initAuth } from "features/auth/authSlice";

import "styles/globals.css";
import "styles/main.scss";
import "styles/globals.css";

import "react-toastify/dist/ReactToastify.css";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps & { user: User }) {
	const isClientSide = typeof window !== "undefined";
	const router = useRouter();

	useEffect(() => {
		store.dispatch(initAuth());
	}, [store]);

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

	return (
		<>
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
			<Script
				src="https://cdn.telemetrydeck.com/websdk/telemetrydeck.min.js"
				data-app-id="809DD6FB-2B5F-4393-B621-52767BFB8047"
			></Script>
		</>
	);
}

export default MyApp;
