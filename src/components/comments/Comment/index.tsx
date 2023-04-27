import { useMemo } from "react";
import { sanitizeHtml } from "helpers/sanitizeHtml";
import { User } from "models";

import Avatar from "components/UI/Avatar";
import HoverPopover from "components/UI/HoverPopover";

import styles from "./Comment.module.scss";

interface CommentProps {
	user: Pick<User, "id" | "username" | "avatar">;
	body: string;
	createdAt: Date;
}

const Comment: React.FC<CommentProps> = ({ user, body, createdAt }) => {
	const formattedFullDate = useMemo(() => {
		const date = new Date(createdAt);
		const month = date.toLocaleString("default", { month: "long" });
		const day = date.getDate();
		const year = date.getFullYear();

		return `${day} ${month}, ${year} at ${date.toLocaleTimeString()}`;
	}, [createdAt]);

	return (
		<li className={styles.comment}>
			<div className={styles.comment__poster__avatar}>
				<Avatar tooltip={false} size="md" username={user.username} avatar={user.avatar} />
			</div>
			<div className={styles.comment__right}>
				<div className={styles.comment__head}>
					<span>{user.username}</span> <span className={styles.spacer}>&#183;</span>{" "}
					<HoverPopover text={formattedFullDate}>
						<span className={styles.comment__formatted_date}>
							{new Date(createdAt).toLocaleDateString()}
						</span>
					</HoverPopover>
				</div>
				<div
					className={styles.comment__content}
					dangerouslySetInnerHTML={{
						__html: sanitizeHtml(body),
					}}
				></div>
			</div>
		</li>
	);
};

export default Comment;
