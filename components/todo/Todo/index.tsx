import { useGetPageTodosQuery, useGetPublicPageTodosQuery } from "features/todo/todoApi";
import { Todo } from "models";

import useAuth from "hooks/useAuth";
import { useLoadingDelay } from "hooks/useLoadingDelay";

import TodoCard from "../TodoCard";
import AddTodoCard from "../AddTodoCard";
import PageErrorLoading from "../../page/PageErrorLoading";
import RectangleSkeleton from "components/skeletons/RectangleSkeleton";

import styles from "./Todo.module.scss";

interface TodoProps {
	pageId: string;
}

const Todo: React.FC<TodoProps> = ({ pageId }) => {
	const { isAuth } = useAuth();

	const {
		data: dataPrivate,
		isLoading: isLoadingPrivate,
		isError: isErrorPrivate,
		isFetching: isFetchingPrivate,
	} = useGetPageTodosQuery({ pageId }, { skip: !isAuth });

	const {
		data: dataPublic,
		isError: isErrorPublic,
		isLoading: isLoadingPublic,
	} = useGetPublicPageTodosQuery({ pageId }, { skip: isAuth });

	const isLoading = isLoadingPrivate || isLoadingPublic;
	const { showLoader } = useLoadingDelay(isLoading || isFetchingPrivate, 500);

	if (isErrorPrivate || isErrorPublic) {
		<div className={styles.todo__container}>
			<p>Failed loading todos, please try again later</p>
		</div>;
	}

	const data = dataPrivate ?? dataPublic;
	if (!data && !isLoading) {
		return <PageErrorLoading />;
	}

	return (
		<div className={styles.todo__container}>
			{showLoader && (
				<>
					<RectangleSkeleton
						height={"100%"}
						width={"100%"}
						styles={{
							minWidth: "40rem",
							maxWidth: "40rem",
							maxHeight: "55%",
							borderRadius: "1rem",
						}}
					/>
					<RectangleSkeleton
						height={"100%"}
						width={"100%"}
						styles={{
							minWidth: "40rem",
							maxWidth: "40rem",
							maxHeight: "40%",
							borderRadius: "1rem",
						}}
					/>
					<RectangleSkeleton
						height={"100%"}
						width={"100%"}
						styles={{
							minWidth: "40rem",
							maxWidth: "40rem",
							maxHeight: "70%",
							borderRadius: "1rem",
						}}
					/>
				</>
			)}

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

			{isAuth && !isLoading && <AddTodoCard pageId={pageId} todosCount={data?.length} />}
		</div>
	);
};

export default Todo;
