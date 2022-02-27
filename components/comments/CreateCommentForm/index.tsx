import Avatar from "components/Avatar";

import useDetectClickOutside from "hooks/useDetectClickOutside";
import { FormEvent, useRef, useState } from "react";

import styles from "./CreateCommentForm.module.scss";

interface CreateCommentFormProps {
	username: string;
	avatar?: string;
	onSubmit: (comment: string) => void;
}

const CreateCommentForm: React.FC<CreateCommentFormProps> = ({ username, avatar, onSubmit }) => {
	const [inputVal, setInputVal] = useState("");
	const [showAdditional, setShowAdditional] = useState(false);

	const newCommentFormRef = useRef(null);
	useDetectClickOutside(newCommentFormRef, () => setShowAdditional(false));

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		onSubmit(inputVal);
		setInputVal("");
		setShowAdditional(false);
	};

	const handleCancel = () => {
		setInputVal("");
		setShowAdditional(false);
	};

	return (
		<div className={styles.add__new__comment} ref={newCommentFormRef}>
			<form onSubmit={handleSubmit}>
				<div className={styles.comment__input}>
					<div>
						<Avatar tooltip={false} size="md" username={username} avatar={avatar} />
					</div>

					<input
						type="text"
						value={inputVal}
						onChange={(e) => setInputVal(e.target.value)}
						onFocus={() => setShowAdditional(true)}
					/>
				</div>
				{showAdditional && (
					<div className={styles.btn__container}>
						<button type="submit" disabled={!inputVal}>
							Submit
						</button>
						<button onClick={handleCancel}>Cancel</button>
					</div>
				)}
			</form>
		</div>
	);
};

export default CreateCommentForm;
