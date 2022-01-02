import { useEffect } from "react";
import { getMe } from "features/auth/authSlice";
import { useAppDispatch } from "hooks/redux-hooks";

interface LayoutInterface {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutInterface> = ({ children }) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			dispatch(getMe(token));
		}
	}, [dispatch]);

	return <div>{children}</div>;
};

export default Layout;
