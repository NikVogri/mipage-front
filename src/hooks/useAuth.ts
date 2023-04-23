import { selectIsAuth, selectUser } from "features/auth/authSlice";

import { useAppSelector } from "./redux-hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";

const useAuth = (props?: { onlyAuth?: boolean }) => {
	const router = useRouter();

	const isAuth = useAppSelector(selectIsAuth);
	const user = useAppSelector(selectUser);

	useEffect(() => {
		if (props?.onlyAuth && !isAuth) {
			router.push("/login");
		}
	}, [props?.onlyAuth, router]);

	return { isAuth, user };
};

export default useAuth;
