import { useState } from "react";

interface DeleteConfirmationProps {
	onDelete: () => void;
	onCancel: () => void;
	text: string;
}

import styles from "./DeleteConfirmation.module.scss";

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onDelete, onCancel, text }) => {
	const [confirmationInputVal, setConfirmationInputVal] = useState("");

	return (
		<div className={styles.delete__confirmation}>
			<p>{text}</p>
			<label htmlFor="delete-confirmation">Enter &quot;DELETE&quot; to confirm</label>
			<input
				id="delete-confirmation"
				type="text"
				placeholder="DELETE"
				onChange={(e) => setConfirmationInputVal(e.target.value)}
			/>
			<div className={styles.btn__container}>
				<button
					className={`form-button btn-md `}
					onClick={onDelete}
					disabled={confirmationInputVal !== "DELETE"}
				>
					Confirm
				</button>
				<button className={`form-button btn-md btn-create`} onClick={onCancel}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default DeleteConfirmation;
