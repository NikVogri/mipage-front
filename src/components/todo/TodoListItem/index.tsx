import PillBadge from "components/UI/PillBadge";
import { formatToBasicDate } from "helpers/date";
import { truncate } from "helpers/stringTools";

import styles from "./TodoListItem.module.scss";

interface TodoListItemProps {
	completed: boolean;
	title: string;
	onOpenModal: (todoItemId: string) => void;
	todoItemId: string;
	createdAt: Date;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ completed, title, todoItemId, createdAt, onOpenModal }) => {
	const isOlderThanOneYear = new Date(createdAt).getFullYear() < new Date().getFullYear();

	return (
		<li className={`${styles.todo__item}`}>
			<button className={styles.todo__item__clickable} onClick={() => onOpenModal(todoItemId)}>
				<p>{truncate(title, 150)}</p>
				<p className={styles.todo__item__creation_date}>
					{formatToBasicDate(new Date(createdAt), isOlderThanOneYear)}
				</p>

				<div className={styles.todo__item__badges}>
					{completed && <PillBadge text="Completed" color="success" />}
				</div>
			</button>
		</li>
	);
};

export default TodoListItem;
