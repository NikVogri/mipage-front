import LoadingSpinner from "components/UI/LoadingSpinner";
import LoadingWrapper from "components/UI/LoadingWrapper";
import TextAreaWithControls from "components/UI/TextAreaWithControls";
import { useUpdateTodoItemMutation } from "features/todo/todoApi";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import { MdAdd, MdDescription } from "react-icons/md";

import styles from "./TodoItemDescriptionSection.module.scss";

interface TodoItemDescriptionSectionProps {
	description: string;
	pageId: string;
	todoId: string;
	todoItemId: string;
}

const TodoItemDescriptionSection: React.FC<TodoItemDescriptionSectionProps> = ({
	description,
	pageId,
	todoId,
	todoItemId,
}) => {
	const [updateTodoItem, { isLoading }] = useUpdateTodoItemMutation();

	const [showDescriptionInput, setShowDescriptionInput] = useState(false);
	const [descriptionValue, setDescriptionValue] = useState("");
	const { isAuth } = useAuth();

	const handleUpdateDescription = async (textValue: string) => {
		updateTodoItem({ description: textValue, pageId, todoItemId, todoId });
		setDescriptionValue(textValue);
		setShowDescriptionInput(false);
	};

	useEffect(() => {
		setDescriptionValue(description);
	}, [description]);

	let content;
	switch (true) {
		case isLoading:
			content = (
				<div className={styles.loading}>
					<p>{descriptionValue}</p>
				</div>
			);

			break;
		case !isAuth && !!description:
			content = (
				<div>
					<p>{description}</p>
				</div>
			);
			break;
		case !isAuth && !descriptionValue:
			content = (
				<div>
					<p>No description provided</p>
				</div>
			);

			break;
		case description && !showDescriptionInput:
			content = (
				<button onClick={() => setShowDescriptionInput(true)}>
					<p>{description}</p>
				</button>
			);
			break;
		case showDescriptionInput:
			content = (
				<TextAreaWithControls
					value={descriptionValue}
					onCancel={() => setShowDescriptionInput(false)}
					onConfirm={handleUpdateDescription}
				/>
			);
			break;
		default:
			content = (
				<button onClick={() => setShowDescriptionInput(true)} className={styles.add__description__btn}>
					<MdAdd size={22} /> <span>Add description</span>
				</button>
			);
			break;
	}

	return (
		<div>
			<h3>
				<MdDescription size={22} /> Description
			</h3>
			<section className={styles.description__section}>{content}</section>
		</div>
	);
};

export default TodoItemDescriptionSection;
