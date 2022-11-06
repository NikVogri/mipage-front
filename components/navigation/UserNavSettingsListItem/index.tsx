import React from "react";

import styles from "./UserNavSettingsListItem.module.scss";

interface UserNavSettingsListItemProps {
	title: string;
	onClick: () => void | Promise<void>;
	className?: string;
}

const UserNavSettingsListItem: React.FC<UserNavSettingsListItemProps> = ({ title, onClick, className }) => {
	return (
		<li className={`${styles.setttings__list__item} ${className}`}>
			<button onClick={onClick}>
				<h4>{title}</h4>
			</button>
		</li>
	);
};

export default UserNavSettingsListItem;
