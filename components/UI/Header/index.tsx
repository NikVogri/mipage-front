import Notifications from "../NavNotifications";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
	return (
		<nav className={styles.header}>
			<Notifications />
		</nav>
	);
};

export default Header;
