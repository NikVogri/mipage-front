import { useGetNotificationsQuery } from "features/notifications/notificationsApi";
import useAuth from "hooks/useAuth";
import { useMemo, useState } from "react";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import NavNotificationsList from "../NavNotificationsList";
import styles from "./NavNotifications.module.scss";

interface NavNotificationsProps {}

const NavNotifications: React.FC<NavNotificationsProps> = () => {
	const { isAuth } = useAuth();

	const { data } = useGetNotificationsQuery(null, {
		pollingInterval: 60000,
		refetchOnReconnect: true,
		skip: !isAuth,
	});

	const [showNotifications, setShowNotifications] = useState(false);
	const notifAvailable = useMemo(() => data && data.some((n) => !n.viewed), [data]);

	return (
		<div className={styles.notifications}>
			<button className={styles.notifications__btn} onClick={() => setShowNotifications(!showNotifications)}>
				<div>
					{!showNotifications ? <IoMdNotificationsOutline size={24} /> : <IoMdNotifications size={24} />}
					{notifAvailable && <div className={styles.unread__notif__reminder}></div>}
				</div>
			</button>

			{showNotifications && <NavNotificationsList notifs={data} onClose={() => setShowNotifications(false)} />}
		</div>
	);
};

export default NavNotifications;
