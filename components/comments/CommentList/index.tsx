import Comment from "../Comment";
import styles from "./CommentList.module.scss";

interface CommentListProps {
	comments: any[];
}

const CommentListList: React.FC<CommentListProps> = ({ comments }) => {
	return (
		<ul className={styles.comments}>
			{!comments.length && <p className={styles.no__comments}>No comments yet</p>}
			{comments.length > 0 &&
				comments.map((c) => <Comment key={c.id} user={c.user} body={c.body} createdAt={c.createdAt} />)}
		</ul>
	);
};

export default CommentListList;
