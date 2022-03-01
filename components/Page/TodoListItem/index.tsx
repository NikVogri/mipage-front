import { useRemoveTodoItemMutation } from "features/todo/todoApi";
import { truncate } from "helpers/truncateText";
import { useState } from "react";
import { MdCheckCircle, MdOpenInFull, MdOutlineRemoveCircle, MdRemove } from "react-icons/md";

import styles from "./TodoListItem.module.scss";

interface TodoListItemProps {
	completed: boolean;
	title: string;
	onOpenModal: (todoItemId: string) => void;
	todoItemId: string;
	pageId: string;
	todoId: string;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ completed, title, todoItemId, pageId, todoId, onOpenModal }) => {
	const [removeTodoItem, { isLoading }] = useRemoveTodoItemMutation();
	const [showControls, setShowControls] = useState(false);

	const handleDeleteTodoItem = async () => {
		await removeTodoItem({ pageId, todoItemId, todoId });
	};

	return (
		<li
			className={`${styles.todo__item} ${completed ? styles.complete : ""}`}
			onMouseOver={() => setShowControls(true)}
			onMouseLeave={() => setShowControls(false)}
		>
			<button onClick={() => onOpenModal(todoItemId)} className={styles.open__modal__btn}>
				{truncate(title, 500)}
			</button>
			<div className={`${styles.todo__item__controls} ${showControls ? styles.active : ""}`}>
				<hr />
				<div className={styles.controls__btn__container}>
					<button title="Complete" className={styles.complete} disabled={isLoading}>
						<MdCheckCircle size={18} />
						<span>Complete</span>
					</button>
					<button
						title="Delete"
						className={styles.remove}
						disabled={isLoading}
						onClick={handleDeleteTodoItem}
					>
						<MdOutlineRemoveCircle size={18} />
						<span>Remove</span>
					</button>
					<button title="Open" onClick={() => onOpenModal(todoItemId)}>
						<MdOpenInFull size={18} />
						<span>Open</span>
					</button>
				</div>
			</div>
		</li>
	);
};

export default TodoListItem;
