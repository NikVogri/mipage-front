import LoadingSpinner from "components/LoadingSpinner";
import { useEffect, useState } from "react";
import styles from "./LoadingButtonBasic.module.scss";

interface LoadingButtonBasicProps {
	disabled: boolean;
	text: string;
	className?: string;
	delay: number;
	isLoading: boolean;
}
const LoadingButtonBasic: React.FC<LoadingButtonBasicProps> = ({ isLoading, disabled, text, className, delay }) => {
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
		<button type="submit" disabled={disabled} className={`${styles.loading__btn} ${className}`}>
			{showLoader && (
				<div className={styles.loader}>
					<LoadingSpinner size={16} />
				</div>
			)}
			<span>{text}</span>
		</button>
	);
};

export default LoadingButtonBasic;
