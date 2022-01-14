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
	token: string;
	items: TodoItem[];
}

const TodoCard: React.FC<TodoCardProps> = ({ id, color, title, items = [], pageId, token }) => {
	const sortedTasks = useMemo((): TodoItem[] => {
		const completedTasks = items?.filter((todo: TodoItem) => todo.completed);
		const uncompletedTasks = items?.filter((todo: TodoItem) => !todo.completed);

		completedTasks.sort(
			(a: TodoItem, b: TodoItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		);

		uncompletedTasks.sort(
			(a: TodoItem, b: TodoItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		);

		return [...uncompletedTasks, ...completedTasks];
	}, [items]);

	return (
		<div className={styles.todo__card}>
			<TodoCardHead color={color} title={title} pageId={pageId} todoId={id} token={token} />
			<div className={styles.card}>
				<TodoCardInfo items={items} title={title} />
				<TodoCardInput pageId={pageId} todoId={id} token={token} />
				{!items.length && <span className={styles.no__tasks}>No tasks yet!</span>}
				<ul>
					{sortedTasks.map((item: TodoItem) => (
						<TodoListItem
							key={item.id}
							todoId={item.todoId}
							token={token}
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
