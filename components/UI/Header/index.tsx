import useWithAuth from "hooks/useWithAuth";
import Notifications from "../NavNotifications";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
	const { token } = useWithAuth();

	return (
		<nav className={styles.header}>
			<Notifications token={token} />
		</nav>
	);
};

export default Header;
