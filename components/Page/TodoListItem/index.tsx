import { useRemoveTodoItemMutation, useUpdateTodoItemMutation } from "features/todo/todoApi";
import { FaCheck, FaTrash } from "react-icons/fa";

import LoadingWrapper from "components/UI/LoadingWrapper";

import styles from "./TodoListItem.module.scss";

interface TodoListItemProps {
	completed: boolean;
	title: string;
	todoId: string;
	pageId: string;
	todoItemId: string;
	token: string;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ completed, title, todoId, pageId, todoItemId, token }) => {
	const [updateTodoItem, { isLoading: updateItemReqLoading }] = useUpdateTodoItemMutation();
	const [removeTodoItem] = useRemoveTodoItemMutation();

	return (
		<li className={styles.todo__card}>
			<button
				className={styles.todo__content}
				title={`Mark as ${completed ? "uncomplete" : "complete"}`}
				type="button"
				onClick={() => updateTodoItem({ completed: !completed, title, todoId, pageId, todoItemId, token })}
			>
				<LoadingWrapper
					SpinnerSize={16}
					isLoading={updateItemReqLoading}
					className={`${styles.checkmark} ${styles.spinner}`}
				>
					<FaCheck size={16} className={`${styles.checkmark} ${completed ? styles.active : ""}`} />
				</LoadingWrapper>

				<span>{title}</span>
			</button>

			<button
				title="Remove"
				className={styles.todo__remove}
				type="button"
				onClick={() => removeTodoItem({ todoId, pageId, todoItemId, token })}
			>
				<FaTrash size={15} />
			</button>
		</li>
	);
};

export default TodoListItem;
