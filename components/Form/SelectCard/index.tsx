import React from "react";

import styles from "./SelectCard.module.scss";

interface SelectCardProps {
	children: any;
	id: any;
	isActive: boolean;
	onSelect: (selection: any) => void;
}

const SelectCard: React.FC<SelectCardProps> = ({ children, id, isActive, onSelect }: SelectCardProps) => {
	const handleClick = () => onSelect(id);

	return (
		<button
			className={`${styles.select__card} ${isActive ? styles.active : ""}`}
			type="button"
			onClick={handleClick}
		>
			{children}
		</button>
	);
};

export default SelectCard;
