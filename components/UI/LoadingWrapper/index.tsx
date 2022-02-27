import LoadingSpinner from "components/LoadingSpinner";
import { useEffect, useState } from "react";
import { FaLaptopHouse } from "react-icons/fa";

import styles from "./LoadingWrapper.module.scss";

interface LoadingWrapperProps {
	children: any;
	isLoading: boolean;
	SpinnerSize?: number;
	spinnerCenter?: boolean;
	delay?: number;
	className?: string;
	[props: string]: any;
}

const LoadingWrapper = ({
	children,
	isLoading,
	SpinnerSize,
	delay,
	className,
	spinnerCenter = true,
	...props
}: LoadingWrapperProps): JSX.Element => {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let loader: NodeJS.Timeout;
		if (isLoading) {
			loader = setTimeout(() => setLoading(true), typeof delay === "number" ? delay : 350);
		} else {
			setLoading(false);
		}

		return () => clearTimeout(loader);
	}, [isLoading, delay]);

	return (
		<div
			className={`${className ? className : ""} ${styles.loading__wrapper} ${spinnerCenter ? styles.center : ""}`}
		>
			{loading ? (
				<LoadingSpinner className={styles.loadingSpinner} size={SpinnerSize || 16} {...props} />
			) : (
				children
			)}
		</div>
	);
};

export default LoadingWrapper;
