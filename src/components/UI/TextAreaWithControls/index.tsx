import { FormEvent, useEffect, useState } from "react";
import styles from "./TextAreaWithControls.module.scss";

interface TodoItemModalProps {
	onCancel: () => void;
	onConfirm: (textValue: string) => void;
	value: string;
}

const TextAreaWithControls: React.FC<TodoItemModalProps> = ({ onCancel, onConfirm, value }) => {
	const [textValue, setTextValue] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onConfirm(textValue);
	};

	useEffect(() => {
		if (value) {
			setTextValue(value);
		}
	}, [value]);

	return (
		<div className={styles.textarea__with__controls}>
			<form onSubmit={handleSubmit}>
				<textarea value={textValue} onChange={(e) => setTextValue(e.target.value)}></textarea>
				<div className={styles.btn__container}>
					<button type="submit" className={styles.cofirm__btn} disabled={textValue === value}>
						Confirm
					</button>
					<button onClick={onCancel} className={styles.cofirm__btn} type="button">
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default TextAreaWithControls;
