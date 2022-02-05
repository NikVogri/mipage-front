import { useMarkNotificationCompletedMutation } from "features/notifications/notificationsApi";
import { Notification, NotificationType } from "models";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";

import NavNotificationListItem from "../NavNotificationListItem";

import styles from "./NavNotificationsList.module.scss";

interface NavNotificationsListProps {
	notifs?: Notification[];
	token: string;
	onClose: () => void;
}

const NavNotificationsList: React.FC<NavNotificationsListProps> = ({ notifs, token, onClose }) => {
	const [markNotificationComplete] = useMarkNotificationCompletedMutation();
	const router = useRouter();

	const notViewedNotifsCount = useMemo(() => (notifs ? notifs.filter((n) => !n.viewed).length : 0), [notifs]);
	const notifListRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: Event) => {
			if (notifListRef.current && !notifListRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, [onClose]);

	const handleMarkNotificationViewed = async (
		id: string,
		type: NotificationType,
		additionalInfo?: Record<string, unknown>
	): Promise<void> => {
		await markNotificationComplete({ id, token });

		if (type === NotificationType.ADDED_TO_PAGE && additionalInfo?.pageId) {
			router.push(`/pages/${additionalInfo.pageId}`);
		}
	};

	return (
		<div className={`${styles.notifications__list} ${styles.active}`} ref={notifListRef}>
			<h3>Notifications {notifs ? <span>({notViewedNotifsCount})</span> : null}</h3>
			<ul className={styles.notifications__container}>
				{notifs && notifs.length > 0 ? (
					notifs.map((n) => (
						<NavNotificationListItem
							key={n.id}
							id={n.id}
							title={n.title}
							body={n.body}
							type={n.type}
							viewed={n.viewed}
							additionalData={n.additionalData}
							onClick={handleMarkNotificationViewed}
						/>
					))
				) : (
					<p className={styles.no__notifs}>No new notifications</p>
				)}
			</ul>
		</div>
	);
};

export default NavNotificationsList;
