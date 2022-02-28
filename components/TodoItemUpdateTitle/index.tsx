import LoadingSpinner from "components/LoadingSpinner";
import TextAreaWithControls from "components/UI/TextAreaWithControls";
import { useUpdateTodoItemMutation } from "features/todo/todoApi";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdUpdate } from "react-icons/md";
import { toast } from "react-toastify";
import styles from "./TodoItemUpdateTitle.module.scss";

interface TodoItemUpdateTitleProps {
	title: string;
	pageId: string;
	todoItemId: string;
	todoId: string;
}

const TodoItemUpdateTitle: React.FC<TodoItemUpdateTitleProps> = ({ title, pageId, todoItemId, todoId }) => {
	const [updateTodoItem, { isLoading }] = useUpdateTodoItemMutation();
	const [showInput, setShowInput] = useState(false);

	const handleUpdateTitle = (newTitle: string) => {
		setShowInput(false);

		if (!newTitle) {
			return toast.error("Title cannot be empty");
		}

		updateTodoItem({ title: newTitle, pageId, todoItemId, todoId });
	};

	if (isLoading) {
		return (
			<div className={styles.loading}>
				<h1>{title}</h1>
			</div>
		);
	}

	if (showInput) {
		return (
			<div className={styles.title}>
				<TextAreaWithControls
					value={title}
					onConfirm={handleUpdateTitle}
					onCancel={() => setShowInput(false)}
				/>
			</div>
		);
	}

	return (
		<div className={styles.title}>
			<button onClick={() => setShowInput(true)}>
				<h1>{title}</h1>
			</button>
		</div>
	);
};

export default TodoItemUpdateTitle;