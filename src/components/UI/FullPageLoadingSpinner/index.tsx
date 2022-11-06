import LoadingSpinner from "components/UI/LoadingSpinner";
import React, { useEffect, useState } from "react";

import styles from "./FullPageLoadingSpinner.module.scss";

interface FullPageLoadingSpinnerProps {
	isLoading: boolean;
	delay?: number;
}

const FullPageLoadingSpinner: React.FC<FullPageLoadingSpinnerProps> = ({ isLoading, delay }) => {
	const [tipIndex, setTipIndex] = useState(0);
	const [loading, setLoading] = useState(false);

	const tips = [
		"Use todo pages to create todo lists!",
		"Public pages can be accessed by anyone!",
		"Add people to edit your pages!",
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setTipIndex((oldIndex) => {
				if (oldIndex + 1 >= tips.length) {
					return 0;
				}

				return oldIndex + 1;
			});
		}, 5000);

		return () => clearInterval(interval);
	}, [tips.length]);

	useEffect(() => {
		let loader: NodeJS.Timeout;
		if (isLoading) {
			loader = setTimeout(() => setLoading(true), typeof delay === "number" ? delay : 350);
		} else {
			setLoading(false);
		}

		return () => clearTimeout(loader);
	}, [isLoading, delay]);

	if (!loading) {
		return <></>;
	}

	return (
		<div className={styles.background}>
			<LoadingSpinner size={32} />
			<h3>{tips[tipIndex]}</h3>
		</div>
	);
};

export default FullPageLoadingSpinner;
