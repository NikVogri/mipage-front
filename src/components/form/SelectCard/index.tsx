import React from "react";

import styles from "./SelectCard.module.scss";

interface SelectCardProps {
	children: any;
	id: any;
	isActive: boolean;
	disabled?: boolean;
	onSelect: (selection: any) => void;
}

const SelectCard: React.FC<SelectCardProps> = ({ children, id, isActive, onSelect, disabled }: SelectCardProps) => {
	return (
		<button
			className={`${styles.select__card} ${disabled ? styles.disabled : ""} ${isActive ? styles.active : ""}`}
			type="button"
			disabled={disabled}
			onClick={() => onSelect(id)}
		>
			{children}
		</button>
	);
};

export default SelectCard;
