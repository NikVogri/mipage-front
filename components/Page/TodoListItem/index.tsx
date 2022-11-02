import { useCompleteTodoItemMutation, useRemoveTodoItemMutation } from "features/todo/todoApi";
import { truncate } from "helpers/stringTools";
import useAuth from "hooks/useAuth";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { MdCheckCircle, MdOpenInFull, MdOutlineRemoveCircle } from "react-icons/md";

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
	const [removeTodoItem, { isLoading: removeLoading }] = useRemoveTodoItemMutation();
	const [toggleCompleteTodoItem, { isLoading: updateLoading }] = useCompleteTodoItemMutation();
	const [showControls, setShowControls] = useState(false);
	const { isAuth } = useAuth();

	const handleDeleteTodoItem = async () => {
		await removeTodoItem({ pageId, todoItemId, todoId });
	};

	const handleCompleteToggleTodoItem = async () => {
		await toggleCompleteTodoItem({ pageId, todoItemId, todoId });
	};

	const isLoading = updateLoading || removeLoading;

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
				{isAuth && (
					<>
						<hr />
						<div className={styles.controls__btn__container}>
							<button
								title="Complete"
								onClick={handleCompleteToggleTodoItem}
								className={styles.complete}
								disabled={isLoading}
							>
								{!completed ? <MdCheckCircle size={18} /> : <IoMdCloseCircle size={18} />}
								<span>{!completed ? "Complete" : "Uncomplete"}</span>
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
					</>
				)}
			</div>
		</li>
	);
};

export default TodoListItem;
