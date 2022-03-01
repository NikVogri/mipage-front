import { useCreateTodoItemCommentMutation } from "features/comment/commentApi";
import { FormEvent, useState } from "react";

import Avatar from "components/Avatar";
import LoadingButtonBasic from "components/UI/LoadingButtonBasic/LoadingButtonBasic";

import styles from "./CreateCommentForm.module.scss";

interface CreateCommentFormProps {
	username: string;
	avatar?: string;
	pageId: string;
	todoItemId: string;
}

const CreateCommentForm: React.FC<CreateCommentFormProps> = ({ username, avatar, pageId, todoItemId }) => {
	const [createComment, { isLoading }] = useCreateTodoItemCommentMutation();
	const [inputVal, setInputVal] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await createComment({ body: inputVal, pageId, todoItemId });
			setInputVal("");
		} catch (error) {}
	};

	return (
		<div className={styles.add__new__comment}>
			<form onSubmit={handleSubmit}>
				<div className={styles.comment__input}>
					<div>
						<Avatar tooltip={false} size="md" username={username} avatar={avatar} />
					</div>

					<input
						type="text"
						value={inputVal}
						disabled={isLoading}
						onChange={(e) => setInputVal(e.target.value)}
					/>
				</div>
				<div className={styles.btn__container}>
					<LoadingButtonBasic
						text="Submit"
						disabled={!inputVal || isLoading}
						isLoading={isLoading}
						delay={250}
					/>
				</div>
			</form>
		</div>
	);
};

export default CreateCommentForm;
