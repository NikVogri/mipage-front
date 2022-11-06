import { selectIsAuth, selectUser } from "features/auth/authSlice";

import { useAppSelector } from "./redux-hooks";

const useAuth = () => {
	const isAuth = useAppSelector(selectIsAuth);
	const user = useAppSelector(selectUser);

	return { isAuth, user };
};

export default useAuth;
