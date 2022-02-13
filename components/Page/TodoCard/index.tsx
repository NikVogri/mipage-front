import { TodoItem } from "models";
import { useMemo, memo } from "react";

import TodoCardHead from "../TodoCardHead";
import TodoCardInfo from "../TodoCardInfo";
import TodoCardInput from "../TodoCardInput";
// import TodoCardEdit from "../../modals/TodoCardEdit/TodoCardEdit";
import TodoListItem from "../TodoListItem";

import styles from "./TodoCard.module.scss";

interface TodoCardProps {
	id: string;
	color: string;
	title: string;
	pageId: string;
	items: TodoItem[];
}

const TodoCard: React.FC<TodoCardProps> = ({ id, color, title, items = [], pageId }) => {
	return (
		<div className={styles.todo__card}>
			<TodoCardHead color={color} title={title} pageId={pageId} todoId={id} />
			<div className={styles.card}>
				<TodoCardInfo items={items} title={title} />
				<TodoCardInput pageId={pageId} todoId={id} />
				{!items.length && <span className={styles.no__tasks}>No tasks yet!</span>}
				<ul>
					{items.map((item: TodoItem) => (
						<TodoListItem
							key={item.id}
							todoId={item.todoId}
							completed={item.completed}
							pageId={pageId}
							title={item.title}
							todoItemId={item.id}
						/>
					))}
				</ul>
			</div>
		</div>
	);
};

export default memo(TodoCard);
