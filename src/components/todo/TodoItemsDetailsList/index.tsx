import Avatar from "components/UI/Avatar";
import styles from "./TodoItemsDetailsList.module.scss";

interface TodoItemsDetailsListProps {
	avatar?: string;
	username: string;
	createdAt: Date;
	completed: boolean;
	completedAt: Date;
}

const TodoItemsDetailsList: React.FC<TodoItemsDetailsListProps> = ({
	avatar,
	username,
	createdAt,
	completed,
	completedAt,
}) => {
	return (
		<ul className={styles.about__item__details}>
			<li>
				<span className={styles.about__title}>Owner:</span>{" "}
				<div>
					{username && <Avatar avatar={avatar} username={username} tooltip={false} size="sm" />}
					<span className={styles.creator__name} title={!username ? "This user does not exist anymore!" : ""}>
						{username ? username : "Unknown"}
					</span>
				</div>
			</li>

			<li>
				<span className={styles.about__title}>Created:</span>
				<div>
					<span>
						{new Date(createdAt).toLocaleDateString()} at {new Date(createdAt).toLocaleTimeString()}
					</span>
				</div>
			</li>
			{completed && (
				<li>
					<span className={styles.about__title}>Completed:</span>
					<div>
						<span>
							{new Date(completedAt).toLocaleDateString()} at {new Date(completedAt).toLocaleTimeString()}
						</span>
					</div>
				</li>
			)}
		</ul>
	);
};

export default TodoItemsDetailsList;
