import React from "react";

import styles from "./SidebarButton.module.scss";

interface SidebarButtonProps {
	onClick: () => void;
	children: React.ReactNode;
}
const SidebarButton: React.FC<SidebarButtonProps> = ({ onClick, children }) => {
	return (
		<div className={styles.button_container}>
			<button title="Add new members" onClick={onClick}>
				{children}
			</button>
		</div>
	);
};

export default SidebarButton;
