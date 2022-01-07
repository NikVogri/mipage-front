import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppSelector } from "./redux-hooks";

const useWithAuth = () => {
	const isAuth = useAppSelector((state) => state.auth.isAuth);
	const loading = useAppSelector((state) => state.auth.loading);
	const token = useAppSelector((state) => state.auth.token);
	const router = useRouter();

	useEffect(() => {
		console.log(isAuth, loading);
		if (!isAuth && !loading) {
			router.push("/login");
		}
	}, [isAuth, loading, token, router]);

	return {
		// 	id: id as string,
		// 	username: username as string,
		token: token as string,
	};
};

export default useWithAuth;
