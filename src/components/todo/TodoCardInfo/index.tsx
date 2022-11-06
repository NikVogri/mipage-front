import { TodoItem } from "models";
import { useState, useEffect } from "react";

import styles from "./TodoCardInfo.module.scss";

interface TodoCardInfoProps {
	title: string;
	items: TodoItem[];
}

const TodoCardInfo: React.FC<TodoCardInfoProps> = ({ title, items }) => {
	const [completed, setCompleted] = useState(0);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		setTotal(items.length);
		setCompleted(items.filter((item: TodoItem) => item.completed).length);
	}, [items]);

	return (
		<div className={styles.card_info}>
			<h3 className={styles.card_title}>{title}</h3>
			<span>{completed} / {total}</span>
		</div>
	);
};

export default TodoCardInfo;
