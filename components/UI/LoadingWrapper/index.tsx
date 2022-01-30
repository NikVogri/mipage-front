import LoadingSpinner from "components/LoadingSpinner";
import { useEffect, useState } from "react";

interface LoadingWrapperProps {
	children: any;
	isLoading: boolean;
	SpinnerSize?: number;
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
	...props
}: LoadingWrapperProps): JSX.Element => {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let loader: NodeJS.Timeout;
		if (isLoading) {
			loader = setTimeout(() => setLoading(true), delay || 350);
		} else {
			setLoading(false);
		}

		return () => clearTimeout(loader);
	}, [isLoading, delay]);

	return (
		<div className={className}>{loading ? <LoadingSpinner size={SpinnerSize || 16} {...props} /> : children}</div>
	);
};

export default LoadingWrapper;
