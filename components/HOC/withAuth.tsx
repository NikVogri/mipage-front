import React from "react";

import { selectAuthChecked } from "features/auth/authSlice";
import { useAppSelector } from "hooks/redux-hooks";
import useAuth from "hooks/useAuth";
import FullPageLoadingSpinner from "components/UI/FullPageLoadingSpinner/FullPageLoadingSpinner";

const onlyAuth = (
	WrappedComponent: React.FC,
	{ forceRedirect = false, allowException = false }: { forceRedirect?: boolean; allowException?: boolean }
) => {
	// eslint-disable-next-line react/display-name
	return (props: React.ComponentProps<any>) => {
		const authChecked = useAppSelector(selectAuthChecked);
		const { isAuth } = useAuth();

		if (!authChecked) {
			return <FullPageLoadingSpinner />;
		}

		if (allowException) {
			return <WrappedComponent {...props} />;
		}

		if (isAuth) {
			return <WrappedComponent {...props} />;
		}

		if (!isAuth && authChecked) {
			if (process.browser && forceRedirect) {
				window.location.href = "/login";
			}
		}

		// return blank page when user is not auth not to confuse user by making
		// them think they are logged in
		return <></>;
	};
};

export default onlyAuth;
