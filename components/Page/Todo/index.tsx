import { useGetPageTodosQuery, useGetPublicPageTodosQuery } from "features/todo/todoApi";

import LoadingSpinner from "components/LoadingSpinner";
import TodoCard from "../TodoCard";

import styles from "./Todo.module.scss";
import AddTodoCard from "../AddTodoCard";
import useAuth from "hooks/useAuth";
import { Todo } from "models";
import PageErrorLoading from "../PageErrorLoading";

interface TodoProps {
	pageId: string;
}

const Todo: React.FC<TodoProps> = ({ pageId }) => {
	const { isAuth } = useAuth();

	const {
		data: dataPrivate,
		isLoading: isLoadingPrivate,
		isError: isErrorPrivate,
	} = useGetPageTodosQuery({ pageId }, { skip: !isAuth });

	const {
		data: dataPublic,
		isLoading: isLoadingPublic,
		isError: isErrorPublic,
	} = useGetPublicPageTodosQuery({ pageId }, { skip: isAuth });

	if (isLoadingPrivate || isLoadingPublic) {
		return (
			<div className={styles.todo__container}>
				<div className={styles.todo__loading}>
					<LoadingSpinner />
				</div>
			</div>
		);
	}

	if (isErrorPrivate || isErrorPublic) {
		<div className={styles.todo__container}>
			<p>Failed loading todos, please try again later</p>
		</div>;
	}

	const data = dataPrivate ?? dataPublic;
	if (!data) {
		return <PageErrorLoading />;
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
						todoId={tb.id}
					/>
				))}
			{isAuth && <AddTodoCard pageId={pageId} todosCount={data?.length} />}
		</div>
	);
};

export default Todo;
