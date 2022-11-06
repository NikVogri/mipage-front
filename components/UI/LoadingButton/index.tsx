import React, { ReactNode, useRef } from "react";

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
	const btnRef = useRef<HTMLButtonElement>(null);

	return (
		<button
			ref={btnRef}
			disabled={disabled}
			className={`${styles.btn__submit} ${className} ${flat && styles.flat} ${styles[position]} ${
				styles[scheme]
			}`}
			style={showLoader ? { width: btnRef.current?.offsetWidth, height: btnRef.current?.offsetHeight } : {}}
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
