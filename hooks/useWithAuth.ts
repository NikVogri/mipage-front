import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppSelector } from "./redux-hooks";

const useWithAuth = (forceRedirect = true) => {
	const isAuth = useAppSelector((state) => state.auth.isAuth);
	const loading = useAppSelector((state) => state.auth.loading);
	const token = useAppSelector((state) => state.auth.token);
	const id = useAppSelector((state) => state.auth.id);
	const username = useAppSelector((state) => state.auth.username);
	const router = useRouter();

	useEffect(() => {
		if (!isAuth && !loading && forceRedirect) {
			router.push("/login");
		}
	}, [isAuth, loading, router, forceRedirect]);

	return {
		id: id as string,
		username: username as string,
		token: token as string,
	};
};

export default useWithAuth;
