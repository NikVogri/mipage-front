import { useEffect, useState } from "react";

export const useLoadingDelay = (isLoading: boolean, delay?: number) => {
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

	return {
		showLoader,
	};
};
