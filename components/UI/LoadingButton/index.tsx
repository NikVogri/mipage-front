import LoadingSpinner from "components/LoadingSpinner";
import React, { useEffect, useState } from "react";

interface LoadingButtonProps {
	children: any;
	isLoading: boolean;
	size?: number;
	[props: string]: any;
}

const LoadingButton = ({ children, isLoading, size, ...props }: LoadingButtonProps): JSX.Element => {
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
		<button {...props} className="form-button" disabled={isLoading}>
			{loading ? <LoadingSpinner size={size} /> : children}
		</button>
	);
};

export default LoadingButton;
