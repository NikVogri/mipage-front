import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppSelector } from "./redux-hooks";

const useWithAuth = () => {
	const { isAuth, id, username, token, loading } = useAppSelector((state) => state.auth);
	const router = useRouter();

	useEffect(() => {
		if (!isAuth && !loading) {
			router.push("/login");
		}
	}, [isAuth, loading, router]);

	return {
		id: id as string,
		username: username as string,
		token: token as string,
	};
};

export default useWithAuth;
