import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { useState } from "react";
import { FaCog, FaTrash } from "react-icons/fa";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import styles from "./TodoCardHead.module.scss";
import { useRemoveTodoBlockMutation } from "features/todo/todoApi";

interface TodoCardHeadProps {
	color: string;
	title: string;
	pageId: string;
	todoId: string;
	token: string;
}

const TodoCardHead: React.FC<TodoCardHeadProps> = ({ color, title, pageId, todoId, token }) => {
	const [removeTodoBlock, {}] = useRemoveTodoBlockMutation();

	const handleDeleteTodoList = async () => {
		const confirmed = confirm(`Are you sure you want to delete: ${title}?`);

		if (confirmed) {
			await removeTodoBlock({ token, pageId, todoId });
		}
	};

	return (
		<div className={styles.card__top} style={{ backgroundColor: color }}>
			<Menu
				menuClassName={styles.menu}
				direction="right"
				menuButton={
					<MenuButton>
						<FaCog size={17} />
					</MenuButton>
				}
				transition
			>
				<MenuItem className={styles.menu_item}>
					<FaCog size={12} /> Settings
				</MenuItem>
				<MenuItem className={styles.menu_item} onClick={handleDeleteTodoList}>
					<FaTrash size={12} /> Delete
				</MenuItem>
			</Menu>
		</div>
	);
};

export default TodoCardHead;
