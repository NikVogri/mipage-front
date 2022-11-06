import LoadingSpinner from "components/LoadingSpinner";
import { useEffect, useState } from "react";
import styles from "./LoadingButtonBasic.module.scss";

interface LoadingButtonBasicProps {
	disabled?: boolean;
	text?: string;
	className?: string;
	delay: number;
	isLoading: boolean;
	type?: "submit" | "reset" | "button";
	onClick?: () => void;
	children?: React.ReactNode;
}
const LoadingButtonBasic: React.FC<LoadingButtonBasicProps> = ({
	isLoading,
	disabled,
	text,
	className,
	delay,
	type,
	onClick,
	children,
}) => {
	const [showLoader, setShowLoader] = useState(false);

	useEffect(() => {
		let loader: NodeJS.Timeout;
		if (isLoading) {
			loader = setTimeout(() => setShowLoader(true), typeof delay === "number" ? delay : 350);
		} else {
			setShowLoader(false);
		}

		return () => clearTimeout(loader);
	}, [isLoading, delay]);

	return (
		<button type={type} disabled={disabled} className={`${styles.loading__btn} ${className}`} onClick={onClick}>
			{showLoader && (
				<div className={styles.loader}>
					<LoadingSpinner size={16} />
				</div>
			)}
			{!children ? <span>{text}</span> : children}
		</button>
	);
};

export default LoadingButtonBasic;
