import React from "react";
import { useCompleteTodoItemMutation, useRemoveTodoItemMutation } from "features/todo/todoApi";
import { IoMdCheckmark, IoMdClose, IoMdTrash } from "react-icons/io";

import LoadingButtonPrimary from "components/UI/LoadingButtonPrimary/LoadingButtonPrimary";

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
			<div className={styles.right__controls__btn__container}>
				<LoadingButtonPrimary
					onClick={handleCompleteTodoItem}
					isLoading={completeItemLoading}
					disabled={isLoading}
					delay={350}
					scheme={completed ? "delete" : "create"}
				>
					{completed ? <IoMdClose size={20} /> : <IoMdCheckmark size={20} />}
				</LoadingButtonPrimary>
				<LoadingButtonPrimary
					onClick={handleRemoveTodoItem}
					isLoading={removeItemLoading}
					disabled={isLoading}
					delay={350}
					scheme="delete"
				>
					<IoMdTrash size={20} />
				</LoadingButtonPrimary>
			</div>
		</div>
	);
};

export default TodoItemControls;
