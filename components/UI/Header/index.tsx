import UserNavSettings from "components/UserNavSettings";
import useAuth from "hooks/useAuth";
import Link from "next/link";
import Notifications from "../NavNotifications";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
	const { isAuth, user } = useAuth();

	return (
		<nav className={styles.header}>
			{isAuth ? (
				<div className={styles.header__container}>
					<Notifications />
					<UserNavSettings username={user?.username!} avatar={user?.avatar} />
				</div>
			) : (
				<div className={styles.header__container}>
					<Link href="/login">
						<a className={`${styles.auth__btn} ${styles.auth__btn_login}`}>Login</a>
					</Link>
					<Link href="/register">
						<a className={`${styles.auth__btn} ${styles.auth__btn_register}`}>Get started</a>
					</Link>
				</div>
			)}
		</nav>
	);
};

export default Header;
