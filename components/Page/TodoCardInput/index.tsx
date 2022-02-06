import LoadingWrapper from "components/UI/LoadingWrapper";
import { useCreateTodoItemMutation } from "features/todo/todoApi";
import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

import styles from "./TodoCardInput.module.scss";

interface TodoCardInput {
	pageId: string;
	todoId: string;
}

const TodoCardInput: React.FC<TodoCardInput> = ({ pageId, todoId }) => {
	const [createTodoItem, { isLoading }] = useCreateTodoItemMutation();

	const [input, setInput] = useState("");
	const [focused, setFocused] = useState(false);
	const [isInputValid, setIsInputValid] = useState(false);

	const addInput = useRef(null);

	const handleAddItem = async (e: FormEvent) => {
		e.preventDefault();

		if (isInputValid) {
			await createTodoItem({ title: input, pageId, todoId });
			setIsInputValid(false);
			setInput("");
			setFocused(false);
		}
	};

	const handleFocusEvent = (isFocused: boolean) => {
		if (!isFocused) {
			setInput("");
		}

		setFocused(isFocused);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput(e.currentTarget.value);
		setIsInputValid(e.currentTarget.value.length > 0);
	};

	return (
		<div className={styles.card_input}>
			<form onSubmit={handleAddItem}>
				<input
					placeholder="Add a task"
					value={input}
					onChange={handleInputChange}
					type="text"
					ref={addInput}
					onFocus={() => handleFocusEvent(true)}
					onBlur={() => handleFocusEvent(false)}
					disabled={isLoading}
				/>
				{isInputValid && focused && !isLoading && (
					<i className={`${styles.valid} ${focused ? styles.active : ""}`}>
						<FaCheck size={12} />
					</i>
				)}

				{isLoading && (
					<i className={`${styles.valid} ${styles.active}`}>
						<LoadingWrapper isLoading={isLoading} SpinnerSize={12}>
							<i></i>
						</LoadingWrapper>
					</i>
				)}

				{!isInputValid && focused && (
					<i className={`${styles.valid} ${focused ? styles.active : ""}`}>
						<FaTimes size={12} />
					</i>
				)}
			</form>
		</div>
	);
};

export default TodoCardInput;
