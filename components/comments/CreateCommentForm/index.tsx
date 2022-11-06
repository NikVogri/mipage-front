import { useCreateTodoItemCommentMutation } from "features/comment/commentApi";
import { FormEvent, useState } from "react";
import { TodoItemComment } from "models";

import Avatar from "components/Avatar";
import LoadingButton from "components/UI/LoadingButton";

import styles from "./CreateCommentForm.module.scss";

interface CreateCommentFormProps {
	username: string;
	avatar?: string;
	pageId: string;
	todoItemId: string;
	onCommentAdded: (comment: TodoItemComment) => void;
}

const CreateCommentForm: React.FC<CreateCommentFormProps> = ({
	username,
	avatar,
	pageId,
	todoItemId,
	onCommentAdded,
}) => {
	const [createComment, { isLoading }] = useCreateTodoItemCommentMutation();
	const [inputVal, setInputVal] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const res = (await createComment({ body: inputVal, pageId, todoItemId })) as any;
			setInputVal("");

			if (res?.data) {
				onCommentAdded(res.data as TodoItemComment); // Todo change to correct type
			}
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
					<LoadingButton
						disabled={!inputVal || isLoading}
						isLoading={isLoading}
						delay={250}
						position="right"
						scheme="success"
					>
						Submit
					</LoadingButton>
				</div>
			</form>
		</div>
	);
};

export default CreateCommentForm;
