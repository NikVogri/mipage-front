import { IoMdTrash } from "react-icons/io";
import { useDeleteNotebookBlockMutation } from "features/notebook/notebookApi";

import LoadingSpinner from "components/UI/LoadingSpinner";

import styles from "./NotebookDeleteButton.module.scss";

interface NotebookDeleteButtonProps {
	pageId: string;
	notebookId: string;
	notebookBlockId: string;
	onBeforeDelete?: (notebookBlockId: string) => void;
}

const NotebookDeleteButton: React.FC<NotebookDeleteButtonProps> = ({
	pageId,
	notebookId,
	notebookBlockId,
	onBeforeDelete,
}) => {
	const [deleteNotebookBlock, { isLoading }] = useDeleteNotebookBlockMutation();

	const handleDeleteClick = async () => {
		if (onBeforeDelete) onBeforeDelete(notebookBlockId);
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

export default NotebookDeleteButton;
