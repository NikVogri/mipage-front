import React from "react";

import styles from "./FormFeedback.module.scss";

interface FormFeedbackProps {
	type: "success" | "error";
	children: React.ReactNode;
}

const FormFeedback: React.FC<FormFeedbackProps> = ({ children, type }) => {
	return <div className={`${styles.feedback} ${styles[type]}`}>{children}</div>;
};

export default FormFeedback;
