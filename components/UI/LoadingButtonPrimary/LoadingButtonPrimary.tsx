import React, { ReactNode } from "react";
import LoadingButtonBasic from "../LoadingButtonBasic/LoadingButtonBasic";
import styles from "./LoadingButtonPrimary.module.scss";

interface LoadingButtonPrimaryProps {
	children: string | ReactNode;
	delay?: number;
	disabled?: boolean;
	isLoading: boolean;
	position?: "left" | "center" | "right";
	scheme?: "create" | "delete";
	onClick?: () => void;
}
const LoadingButtonPrimary: React.FC<LoadingButtonPrimaryProps> = ({
	children,
	delay = 250,
	isLoading,
	disabled = false,
	onClick,
	position = "center",
	scheme = "default",
}) => {
	return (
		<LoadingButtonBasic
			disabled={disabled}
			className={`${styles.btn__submit} ${styles[position]} ${styles[scheme]}`}
			text={typeof children === "string" ? children : undefined}
			children={typeof children === "string" ? undefined : children}
			delay={delay}
			isLoading={isLoading}
			type={!onClick ? "submit" : "button"}
			onClick={onClick}
		/>
	);
};

export default LoadingButtonPrimary;
