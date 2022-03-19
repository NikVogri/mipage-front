import { Dispatch, SetStateAction } from "react";
import { useGetSinglePublicTodoItemQuery, useGetSingleTodoItemQuery } from "features/todo/todoApi";
import useAuth from "hooks/useAuth";

import BaseModal from "react-modal";
import TodoItemCommentSection from "components/TodoItemCommentSection";
import TodoItemDescriptionSection from "components/TodoItemDescriptionSection";
import TodoItemsDetailsList from "components/TodoItemsDetailsList";
import LoadingWrapper from "components/UI/LoadingWrapper";
import TodoItemUpdateTitle from "components/TodoItemUpdateTitle";
import TodoItemControls from "components/TodoItemControls/TodoItemControls";

import styles from "./TodoItem.module.scss";
import { IoMdClose } from "react-icons/io";
interface TodoItemModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setIsClosed: () => void;
	todoItemId: string;
	pageId: string;
	todoId: string;
}

const TodoItemModal: React.FC<TodoItemModalProps> = ({ isOpen, setIsOpen, todoItemId, pageId, todoId }) => {
	const { isAuth } = useAuth();

	let { data: dataPrivate, isFetching: isFetchingPrivate } = useGetSingleTodoItemQuery(
		{ pageId, todoId, todoItemId },
		{ skip: !todoItemId || !isAuth }
	);

	let { data: dataPublic, isFetching: isFetchingPublic } = useGetSinglePublicTodoItemQuery(
		{ pageId, todoId, todoItemId },
		{ skip: !todoItemId || isAuth }
	);

	let isLoading = isFetchingPrivate || isFetchingPublic;
	let data = dataPrivate || dataPublic;

	return (
		<BaseModal
			ariaHideApp={false}
			isOpen={isOpen}
			contentLabel={data?.title!}
			className={`${styles.todo__item__modal}`}
			overlayClassName={styles.modal__background}
			onRequestClose={() => setIsOpen(false)}
		>
			<div className={styles.modal__close}>
				<button onClick={() => setIsOpen(false)} className={styles.close__btn} title="Close modal">
					<IoMdClose />
				</button>
			</div>
			<LoadingWrapper
				isLoading={isLoading}
				SpinnerSize={24}
				delay={0}
				className={isLoading ? styles.loading : ""}
			>
				<div className={styles.modal__body}>
					<div className={styles.modal__top}>
						<div className={styles.about__item}>
							<TodoItemUpdateTitle
								title={data?.title!}
								todoItemId={todoItemId}
								pageId={pageId}
								todoId={todoId}
							/>
							<TodoItemsDetailsList
								username={data?.creator?.username!}
								avatar={data?.creator?.avatar!}
								createdAt={data?.createdAt!}
								completed={data?.completed!}
								completedAt={data?.completedAt!}
							/>
						</div>
						{isAuth && (
							<TodoItemControls
								completed={data?.completed!}
								todoItemId={todoItemId}
								pageId={pageId}
								todoId={todoId}
								onDelete={() => setIsOpen(false)}
							/>
						)}
					</div>

					<hr />
					<TodoItemDescriptionSection
						description={data?.description!}
						todoItemId={todoItemId}
						pageId={pageId}
						todoId={todoId}
					/>
					{isAuth && <TodoItemCommentSection pageId={pageId} todoItemId={todoItemId} />}
				</div>
			</LoadingWrapper>
		</BaseModal>
	);
};

export default TodoItemModal;
