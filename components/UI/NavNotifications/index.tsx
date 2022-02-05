import { useGetNotificationsQuery } from "features/notifications/notificationsApi";
import { useState } from "react";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import styles from "./NavNotifications.module.scss";

interface NavNotificationListItemProps {}
interface NavNotificationsProps {
	token: string;
}

const NavNotificationListItem: React.FC<NavNotificationListItemProps> = () => {
	return <li>Notification #1</li>;
};

const NavNotifications: React.FC<NavNotificationsProps> = ({ token }) => {
	const { data } = useGetNotificationsQuery({ token }, { pollingInterval: 60000, refetchOnReconnect: true });

	const [showNotifications, setShowNotifications] = useState(false);
	const notifAvailable = true;

	return (
		<div className={styles.notifications}>
			<button className={styles.notifications__btn} onClick={() => setShowNotifications(!showNotifications)}>
				<div>
					{!showNotifications && <IoMdNotificationsOutline size={24} />}
					{showNotifications && <IoMdNotifications size={24} />}
					{notifAvailable && <div className={styles.undread__notif}></div>}
				</div>
			</button>

			<div className={`${styles.notifications__container} ${showNotifications ? styles.active : ""}`}>
				<h3>Notifications</h3>
				<ul>
					<NavNotificationListItem />
				</ul>
			</div>
		</div>
	);
};

export default NavNotifications;
