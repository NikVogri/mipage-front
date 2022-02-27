import Avatar from "components/Avatar";
import styles from "./TodoItemsDetailsList.module.scss";

interface TodoItemsDetailsListProps {
	avatar?: string;
	username: string;
	createdAt: Date;
}

const TodoItemsDetailsList: React.FC<TodoItemsDetailsListProps> = ({ avatar, username, createdAt }) => {
	return (
		<ul className={styles.about__item__details}>
			<li>
				<span className={styles.about__title}>Created by:</span>{" "}
				<div>
					{username && <Avatar avatar={avatar} username={username} tooltip={false} size="sm" />}
					<span className={styles.creator__name} title={!username ? "This user does not exist anymore!" : ""}>
						{username ? username : "Unknown"}
					</span>
				</div>
			</li>

			<li>
				<span className={styles.about__title}>At:</span>
				<div>
					<span>{new Date(createdAt).toLocaleDateString()}</span>
				</div>
			</li>
		</ul>
	);
};

export default TodoItemsDetailsList;
