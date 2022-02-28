import { Dispatch, SetStateAction, useEffect } from "react";

import BaseModal from "react-modal";
import TodoItemCommentSection from "components/TodoItemCommentSection";
import TodoItemDescriptionSection from "components/TodoItemDescriptionSection";
import TodoItemsDetailsList from "components/TodoItemsDetailsList";

import styles from "./TodoItem.module.scss";
import { useGetSingleTodoItemQuery } from "features/todo/todoApi";
import LoadingWrapper from "components/UI/LoadingWrapper";
import TodoItemUpdateTitle from "components/TodoItemUpdateTitle";

interface TodoItemModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setIsClosed: () => void;
	todoItemId: string;
	pageId: string;
	todoId: string;
}

const TodoItemModal: React.FC<TodoItemModalProps> = ({ isOpen, setIsOpen, todoItemId, pageId, todoId }) => {
	let { data, isFetching } = useGetSingleTodoItemQuery({ pageId, todoId, todoItemId }, { skip: !todoItemId });

	return (
		<BaseModal
			ariaHideApp={false}
			isOpen={isOpen}
			contentLabel={data?.title!}
			className={`${styles.todo__item__modal}`}
			overlayClassName={styles.modal__background}
			onRequestClose={() => setIsOpen(false)}
		>
			<LoadingWrapper
				isLoading={isFetching}
				SpinnerSize={24}
				delay={0}
				className={isFetching ? styles.loading : ""}
			>
				<div className={styles.modal__body}>
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
						/>
					</div>
					<hr />
					<TodoItemDescriptionSection
						description={data?.description!}
						todoItemId={todoItemId}
						pageId={pageId}
						todoId={todoId}
					/>
					<TodoItemCommentSection pageId={pageId} todoItemId={todoItemId} />
				</div>
			</LoadingWrapper>
		</BaseModal>
	);
};

export default TodoItemModal;
