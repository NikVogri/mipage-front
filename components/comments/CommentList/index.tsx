import { useEffect, useState } from "react";
import { TodoItemComment } from "models";

import Comment from "../Comment";
import LoadingButton from "components/UI/LoadingButton";

import styles from "./CommentList.module.scss";

interface CommentListProps {
	comments: TodoItemComment[];
	total: number;
	onLoadMore: (page: number) => void;
	isLoadingMore: boolean;
}

const CommentList: React.FC<CommentListProps> = ({ comments = [], total, onLoadMore, isLoadingMore }) => {
	const [showMoreBtn, setShowMoreBtn] = useState(false);
	const [page, setPage] = useState(0);

	const handleLoadMoreComments = () => {
		setPage((oldPageVal) => oldPageVal + 1);
		onLoadMore(page + 1);
	};

	useEffect(() => {
		setShowMoreBtn(comments.length < total);
	}, [comments.length, total]);

	return (
		<ul className={styles.comments}>
			{!comments?.length && <p className={styles.no__comments}>No comments yet</p>}
			{comments?.length > 0 &&
				comments.map((c) => <Comment key={c.id} user={c.author} body={c.body} createdAt={c.createdAt} />)}
			{showMoreBtn && (
				<LoadingButton
					className={styles.load__more__btn}
					delay={150}
					isLoading={isLoadingMore}
					disabled={isLoadingMore}
					onClick={handleLoadMoreComments}
				>
					Load more
				</LoadingButton>
			)}
		</ul>
	);
};

export default CommentList;
