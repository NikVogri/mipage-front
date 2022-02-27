import Avatar from "components/Avatar";
import { User } from "models";

import styles from "./Comment.module.scss";

interface CommentProps {
	user: User;
	body: string;
	createdAt: string;
}

const Comment: React.FC<CommentProps> = ({ user, body, createdAt }) => {
	return (
		<li className={styles.comment}>
			<div className={styles.comment__poster__avatar}>
				<Avatar tooltip={false} size="md" username={user.username} avatar={user.avatar} />
			</div>
			<div className={styles.comment__right}>
				<p className={styles.comment__poster}>
					by <span>{user.username}</span> &#183; <span>{createdAt}</span>
				</p>
				<p className={styles.comment__content}>{body}</p>
				
			</div>
		</li>
	);
};

export default Comment;
