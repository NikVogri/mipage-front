import useAuth from "hooks/useAuth";
import { useGetTodoItemCommentsQuery } from "features/comment/commentApi";
import { MdComment } from "react-icons/md";

import CommentList from "components/comments/CommentList";
import CreateCommentForm from "components/comments/CreateCommentForm";
import LoadingWrapper from "components/UI/LoadingWrapper";

import styles from "./TodoItemCommentSection.module.scss";
import { useEffect, useState } from "react";
import { TodoItemComment } from "models";

interface TodoItemCommentSectionProps {
	pageId: string;
	todoItemId: string;
}

const TodoItemCommentSection: React.FC<TodoItemCommentSectionProps> = ({ pageId, todoItemId }) => {
	const [comments, setComments] = useState<TodoItemComment[]>([]);
	const [noMoreResults, setNoMoreResults] = useState(false);
	const [page, setPage] = useState(0);

	const { data, isFetching } = useGetTodoItemCommentsQuery(
		{ pageId, todoItemId, page },
		{ skip: noMoreResults, refetchOnMountOrArgChange: true }
	);

	const handleLoadMoreComments = (page: number) => {
		setPage(page);
	};

	useEffect(() => {
		if (data?.comments?.length) {
			// comments endpoint returned more comments, add them to existing comments array.√
			if (page === 0) {
				setComments(data.comments);
			} else {
				setComments((oldComments) => oldComments.concat(data.comments));
			}
		} else if (page > 1) {
			// comments endpoint returned an empty array, calculate if show more button should be shown
			setNoMoreResults(comments.length >= data?.total!);
		}
	}, [data]);

	return (
		<div>
			{isFetching ? <div>Loading...</div> : null}
			<h3>
				<MdComment size={22} />
				Comments
			</h3>
			<section className={styles.comment__section}>
				<CreateCommentForm todoItemId={todoItemId} pageId={pageId} />
				<hr />
				<LoadingWrapper isLoading={isFetching && page === 0} delay={0}>
					<CommentList
						comments={comments}
						total={data?.total!}
						isLoadingMore={isFetching && page > 0}
						onLoadMore={handleLoadMoreComments}
					/>
				</LoadingWrapper>
			</section>
		</div>
	);
};

export default TodoItemCommentSection;
