import { TodoItem } from "models";
import useAuth from "hooks/useAuth";
import { memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { parseQueryParams } from "helpers/router";

import TodoItemModal from "components/modals/TodoItemModal";
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
	const router = useRouter();
	const { isAuth } = useAuth();

	const [showItemSettingsModal, setShowItemsSettingsModal] = useState(false);

	useEffect(() => {
		if (router.isReady && router.query.t && !showItemSettingsModal) {
			handleToggleModal(true, router.query.t as string);
		}
	}, []);

	const handleToggleModal = (open: boolean, todoItemId?: string) => {
		setShowItemsSettingsModal(open);

		router.push(
			{
				query: parseQueryParams({
					...router.query,
					t: open ? todoItemId : undefined,
				}),
			},
			undefined,
			{ shallow: true }
		);
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
								onOpenModal={() => handleToggleModal(true, item.id)}
								createdAt={item.createdAt}
							/>
						))}
					</ul>
				</div>
			</div>

			{showItemSettingsModal && (
				<TodoItemModal
					todoItemId={router.query.t as string}
					pageId={pageId}
					todoId={todoId}
					isOpen={showItemSettingsModal && !!router.query.t}
					setIsOpen={(open) => handleToggleModal(open)}
				/>
			)}
		</>
	);
};

export default memo(TodoCard);
