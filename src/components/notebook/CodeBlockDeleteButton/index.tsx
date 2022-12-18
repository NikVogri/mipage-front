import { IoMdTrash } from "react-icons/io";
import { useDeleteNotebookBlockMutation } from "features/notebook/notebookApi";

import LoadingSpinner from "components/UI/LoadingSpinner";

import styles from "./CodeBlockDeleteButton.module.scss";

interface CodeBlockDeleteButtonProps {
	pageId: string;
	notebookId: string;
	notebookBlockId: string;
}

const CodeBlockDeleteButton: React.FC<CodeBlockDeleteButtonProps> = ({ pageId, notebookId, notebookBlockId }) => {
	const [deleteNotebookBlock, { isLoading }] = useDeleteNotebookBlockMutation();

	const handleDeleteClick = async () => {
		await deleteNotebookBlock({ pageId, notebookId, notebookBlockId });
	};

	return (
		<button
			className={`${styles.button} ${isLoading ? styles.active : ""}`}
			onClick={handleDeleteClick}
			title="Delete"
			disabled={isLoading}
		>
			{isLoading ? <LoadingSpinner className={styles.button_spinner} /> : <IoMdTrash size={18} />}
		</button>
	);
};

export default CodeBlockDeleteButton;
