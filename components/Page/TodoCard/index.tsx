import { TodoItem } from "models";
import useAuth from "hooks/useAuth";
import { memo, useState } from "react";

import TodoItemModal from "components/UI/modals/TodoItem";
import TodoCardHead from "../TodoCardHead";
import TodoCardInfo from "../TodoCardInfo";
import TodoCardInput from "../TodoCardInput";
import TodoListItem from "../TodoListItem";

import styles from "./TodoCard.module.scss";

interface TodoCardProps {
	id: string;
	color: string;
	title: string;
	pageId: string;
	todoId: string;
	items: TodoItem[];
}

const TodoCard: React.FC<TodoCardProps> = ({ id, color, title, items = [], pageId, todoId }) => {
	const [showItemSettingsModal, setShowItemsSettingsModal] = useState(false);
	const [selectedTodoItemId, setSelectedTodoItemId] = useState("");

	const { isAuth } = useAuth();

	const handleOpenModal = (todoItemId: string) => {
		setShowItemsSettingsModal(true);
		setSelectedTodoItemId(todoItemId);
	};

	return (
		<>
			<div className={styles.todo__card}>
				<TodoCardHead color={color} title={title} pageId={pageId} todoId={id} />
				<div className={styles.card}>
					<TodoCardInfo items={items} title={title} />
					{isAuth && <TodoCardInput pageId={pageId} todoId={id} />}
					{!items.length && <span className={styles.no__tasks}>No tasks yet!</span>}
					<ul>
						{items.map((item: TodoItem) => (
							<TodoListItem
								key={item.id}
								completed={item.completed}
								title={item.title}
								todoItemId={item.id}
								onOpenModal={handleOpenModal}
								pageId={pageId}
								todoId={todoId}
							/>
						))}
					</ul>
				</div>
			</div>

			{showItemSettingsModal && (
				<TodoItemModal
					todoItemId={selectedTodoItemId}
					pageId={pageId}
					todoId={todoId}
					isOpen={showItemSettingsModal}
					setIsClosed={() => setShowItemsSettingsModal(false)}
					setIsOpen={setShowItemsSettingsModal}
				/>
			)}
		</>
	);
};

export default memo(TodoCard);
