import { ColorTypes } from "models";
import React from "react";

import styles from "./FormFeedback.module.scss";

interface FormFeedbackProps {
	type: ColorTypes;
	children: React.ReactNode;
}

const FormFeedback: React.FC<FormFeedbackProps> = ({ children, type }) => {
	return <div className={`${styles.feedback} ${styles[type]}`}>{children}</div>;
};

export default FormFeedback;
