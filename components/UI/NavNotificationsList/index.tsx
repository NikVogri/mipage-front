import { useMarkNotificationCompletedMutation } from "features/notifications/notificationsApi";
import useDetectClickOutside from "hooks/useDetectClickOutside";
import { Notification, NotificationType } from "models";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";

import NavNotificationListItem from "../NavNotificationListItem";

import styles from "./NavNotificationsList.module.scss";

interface NavNotificationsListProps {
	notifs?: Notification[];
	onClose: () => void;
}

const NavNotificationsList: React.FC<NavNotificationsListProps> = ({ notifs, onClose }) => {
	const [markNotificationComplete] = useMarkNotificationCompletedMutation();
	const router = useRouter();

	const notViewedNotifsCount = useMemo(() => (notifs ? notifs.filter((n) => !n.viewed).length : 0), [notifs]);
	const notifListRef = useRef<HTMLDivElement>(null);
	useDetectClickOutside(notifListRef, () => onClose());

	const handleMarkNotificationViewed = async (
		id: string,
		type: NotificationType,
		additionalInfo?: Record<string, unknown>
	): Promise<void> => {
		await markNotificationComplete({ id });

		if (type === NotificationType.ADDED_TO_PAGE && additionalInfo?.pageId) {
			router.push(`/pages/${additionalInfo.pageId}`);
		}
	};

	const handleMarkAllNotificationsViewed = async () => {
		if (notifs) {
			const ids = notifs.filter((n) => !n.viewed).map((n) => n.id);

			for (let id of ids) {
				await markNotificationComplete({ id });
			}
		}
	};

	return (
		<div className={`${styles.notifications__list} ${styles.active}`} ref={notifListRef}>
			<h3>
				<span>Notifications {notifs ? <span>({notViewedNotifsCount})</span> : null} </span>
				{notViewedNotifsCount > 0 && (
					<button className={styles.view__all__btn} onClick={handleMarkAllNotificationsViewed}>
						View All
					</button>
				)}
			</h3>
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
