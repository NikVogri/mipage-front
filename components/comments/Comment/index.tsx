import Avatar from "components/Avatar";
import { truncate } from "helpers/truncateText";
import { User } from "models";
import { useState } from "react";

import styles from "./Comment.module.scss";

interface CommentProps {
	user: Pick<User, "id" | "username" | "avatar">;
	body: string;
	createdAt: Date;
}

const Comment: React.FC<CommentProps> = ({ user, body, createdAt }) => {
	const [showMore, setShowMore] = useState(false);
	const [isLongText, setIsLongText] = useState(body.length > 300);

	return (
		<li className={styles.comment}>
			<div className={styles.comment__poster__avatar}>
				<Avatar tooltip={false} size="md" username={user.username} avatar={user.avatar} />
			</div>
			<div className={styles.comment__right}>
				<p className={styles.comment__poster}>
					<span>{user.username}</span> &#183; <span>{new Date(createdAt).toLocaleString()}</span>
				</p>
				<p className={styles.comment__content}>{showMore ? body : truncate(body, 300)}</p>
				{isLongText && (
					<button onClick={() => setShowMore(!showMore)} className={styles.show__more}>
						{showMore ? "Show less" : "Show more"}
					</button>
				)}
			</div>
		</li>
	);
};

export default Comment;
