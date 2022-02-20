import LoadingSpinner from "components/LoadingSpinner";
import React, { useEffect, useState } from "react";

interface LoadingButtonProps {
	children: any;
	isLoading: boolean;
	size?: number;
	className?: string;
	disabled?: boolean;
	[props: string]: any;
}

const LoadingButton = ({
	children,
	isLoading,
	size,
	className,
	disabled = false,
	...props
}: LoadingButtonProps): JSX.Element => {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let loader: NodeJS.Timeout;
		if (isLoading) {
			loader = setTimeout(() => setLoading(true), 1000);
		} else {
			setLoading(false);
		}

		return () => clearTimeout(loader);
	}, [isLoading]);

	return (
		<button {...props} className={`${className} form-button`} disabled={disabled || isLoading}>
			{loading ? <LoadingSpinner size={size ? size : 16} className="mx-auto" /> : children}
		</button>
	);
};

export default LoadingButton;
