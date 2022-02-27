import { truncate } from "helpers/truncateText";

import styles from "./TodoListItem.module.scss";

interface TodoListItemProps {
	completed: boolean;
	title: string;
	onOpenModal: (todoItemId: string) => void;
	todoItemId: string;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ completed, title, todoItemId, onOpenModal }) => {
	return (
		<li className={`${styles.todo__card} ${completed ? styles.complete : ""}`}>
			<button onClick={() => onOpenModal(todoItemId)}>{truncate(title, 500)}</button>
		</li>
	);
};

export default TodoListItem;
