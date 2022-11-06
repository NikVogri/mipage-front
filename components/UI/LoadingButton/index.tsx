import React, { ReactNode } from "react";

import { useLoadingDelay } from "hooks/useLoadingDelay";

import LoadingSpinner from "components/LoadingSpinner";

import styles from "./LoadingButton.module.scss";

interface LoadingButtonProps {
	children: string | ReactNode;
	delay?: number;
	disabled?: boolean;
	isLoading: boolean;
	position?: "left" | "center" | "right";
	scheme?: "success" | "danger";
	onClick?: () => void;
	flat?: boolean;
	className?: string;
}
const LoadingButton: React.FC<LoadingButtonProps> = ({
	children,
	delay = 0,
	isLoading,
	disabled = false,
	onClick,
	position = "center",
	scheme = "default",
	flat,
	className,
}) => {
	const { showLoader } = useLoadingDelay(isLoading, delay);

	return (
		<button
			disabled={disabled}
			className={`${styles.btn__submit} ${className} ${flat && styles.flat} ${styles[position]} ${
				styles[scheme]
			}`}
			onClick={onClick}
		>
			{showLoader ? (
				<div className={styles.loader}>
					<LoadingSpinner size={16} />
				</div>
			) : (
				children
			)}
		</button>
	);
};

export default LoadingButton;
