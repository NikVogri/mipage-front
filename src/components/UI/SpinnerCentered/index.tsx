import LoadingSpinner from "components/UI/LoadingSpinner";
import React from "react";

import styles from "./SpinnerCentered.module.scss";

const SpinnerCentered: React.FC = () => {
	return (
		<div className={styles.loading_full}>
			<LoadingSpinner />
		</div>
	);
};

export default SpinnerCentered;
