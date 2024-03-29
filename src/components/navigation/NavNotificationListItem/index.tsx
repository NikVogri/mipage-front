import { NotificationType } from "models";
import { GoDiffAdded, GoDiffRemoved } from "react-icons/go";

import styles from "./NavNotificationListItem.module.scss";

interface NavNotificationListItemProps {
	title: string;
	body: string;
	id: string;
	type: NotificationType;
	viewed: boolean;
	additionalData?: Record<string, unknown>;
	onClick: (id: string, type: NotificationType, additionalData?: Record<string, unknown>) => Promise<void>;
}

const NavNotificationListItem: React.FC<NavNotificationListItemProps> = ({
	id,
	title,
	body,
	type,
	viewed,
	additionalData,
	onClick,
}) => {
	return (
		<li className={`${styles.notif__item} ${viewed ? styles.viewed : ""}`}>
			<button onClick={() => onClick(id, type, additionalData)}>
				<h4>{title}</h4>
				<p>{body}</p>
			</button>
		</li>
	);
};

export default NavNotificationListItem;
