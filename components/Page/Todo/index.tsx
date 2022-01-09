import { useGetPageTodosQuery } from "features/todo/todoApi";

import LoadingSpinner from "components/LoadingSpinner";
import TodoCard from "../TodoCard";

import styles from "./Todo.module.scss";
import AddTodoCard from "../AddTodoCard";

interface TodoProps {
	pageId: string;
	token: string;
}

const Todo: React.FC<TodoProps> = ({ pageId, token }) => {
	const { data, isLoading, isError } = useGetPageTodosQuery({ pageId, token }, { skip: false });

	if (isLoading) {
		return (
			<div className={styles.todo__container}>
				<div className={styles.todo__loading}>
					<LoadingSpinner />
				</div>
			</div>
		);
	}

	if (isError) {
		<div className={styles.todo__container}>
			<p>Failed loading todos, please try again later</p>
		</div>;
	}

	return (
		<div className={styles.todo__container}>
			{data &&
				data.map((tb) => (
					<TodoCard
						key={tb.id}
						color={tb.color}
						title={tb.title}
						items={tb.items!}
						id={tb.id}
						pageId={tb.pageId}
						token={token}
					/>
				))}
			<AddTodoCard pageId={pageId} token={token} />
		</div>
	);
};

export default Todo;
