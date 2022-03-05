import React from "react";
import { useCompleteTodoItemMutation, useRemoveTodoItemMutation } from "features/todo/todoApi";
import { IoMdCloseCircle } from "react-icons/io";
import { MdCheckCircle, MdOutlineRemoveCircle } from "react-icons/md";

import styles from "./TodoItemControls.module.scss";

interface TodoItemControlsProps {
	completed: boolean;
	pageId: string;
	todoId: string;
	todoItemId: string;
	onDelete: () => void;
}
const TodoItemControls: React.FC<TodoItemControlsProps> = ({ completed, pageId, todoId, todoItemId, onDelete }) => {
	const [completeTodoItem, { isLoading: completeItemLoading }] = useCompleteTodoItemMutation();
	const [removeTodoItem, { isLoading: removeItemLoading }] = useRemoveTodoItemMutation();

	const handleCompleteTodoItem = async () => {
		await completeTodoItem({ pageId, todoId, todoItemId });
	};

	const handleRemoveTodoItem = async () => {
		await removeTodoItem({ pageId, todoId, todoItemId });
		onDelete();
	};

	const isLoading = completeItemLoading || removeItemLoading;

	return (
		<div className={styles.right__controls}>
			<div className={styles.controls__btn__container}>
				<button
					title="Complete item"
					className={styles.complete}
					onClick={handleCompleteTodoItem}
					disabled={isLoading}
				>
					{!completed ? <MdCheckCircle size={18} /> : <IoMdCloseCircle size={18} />}
					<span>{!completed ? "Complete" : "Uncomplete"}</span>
				</button>
				<button
					title="Remove item"
					className={styles.remove}
					onClick={handleRemoveTodoItem}
					disabled={isLoading}
				>
					<MdOutlineRemoveCircle size={18} />
					<span>Remove</span>
				</button>
			</div>
		</div>
	);
};

export default TodoItemControls;
