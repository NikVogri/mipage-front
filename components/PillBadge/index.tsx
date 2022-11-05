import { ColorTypes } from "models";
import React from "react";

import styles from "./PillBadge.module.scss";

interface PillBadgeProps {
	text: string;
	color: ColorTypes;
}

const PillBadge: React.FC<PillBadgeProps> = ({ text, color }) => {
	return <div className={`${styles.pill__badge} ${styles[color]}`}>{text}</div>;
};

export default PillBadge;
