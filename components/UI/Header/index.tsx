import UserNavSettings from "components/UserNavSettings";
import useAuth from "hooks/useAuth";
import Notifications from "../NavNotifications";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
	const { isAuth, user } = useAuth();

	return (
		<nav className={styles.header}>
			{isAuth && (
				<div className={styles.header__container}>
					<Notifications />
					<UserNavSettings username={user?.username!} avatar={user?.avatar} />
				</div>
			)}
		</nav>
	);
};

export default Header;
