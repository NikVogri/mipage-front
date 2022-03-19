import LoadingSpinner from "components/LoadingSpinner";
import React, { useEffect, useState } from "react";

import styles from "./FullPageLoadingSpinner.module.scss";

interface FullPageLoadingSpinnerProps {}
const FullPageLoadingSpinner: React.FC<FullPageLoadingSpinnerProps> = ({}) => {
	const [tipIndex, setTipIndex] = useState(0);

	const tips = [
		"Use todo pages to create todo lists!",
		"Public pages are available to everyone!",
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

	return (
		<div className={styles.background}>
			<LoadingSpinner size={46} />
			<h3>{tips[tipIndex]}</h3>
		</div>
	);
};

export default FullPageLoadingSpinner;
