import LoadingButton from "components/UI/LoadingButton";
import { useState } from "react";

interface DeleteConfirmationProps {
	onDelete: () => void;
	onCancel: () => void;
	isLoading?: boolean;
	text: string;
}

import styles from "./DeleteConfirmation.module.scss";

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onDelete, onCancel, text, isLoading }) => {
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
				<LoadingButton
					isLoading={isLoading ?? false}
					scheme="success"
					disabled={confirmationInputVal !== "DELETE" || isLoading}
					onClick={onDelete}
					delay={250}
				>
					Confirm
				</LoadingButton>
				<LoadingButton isLoading={false} scheme="danger" onClick={onCancel}>
					Cancel
				</LoadingButton>
			</div>
		</div>
	);
};

export default DeleteConfirmation;
