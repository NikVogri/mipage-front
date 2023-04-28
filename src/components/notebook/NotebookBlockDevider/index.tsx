import { DragEvent, useEffect, useRef, useState } from "react";
import { useCreateNotebookBlockMutation, useUpdateNotebookBlockOrderMutation } from "features/notebook/notebookApi";
import { HiPlus } from "react-icons/hi";
import { NotebookBlockType } from "models";

import NotebookBlockDeviderMenu from "../NotebookBlockDeviderMenu";

import styles from "./NotebookBlockDevider.module.scss";

interface NotebookBlockDeviderProps {
	notebookId: string;
	pageId: string;
	previousBlockId?: string;
	showDropzone?: boolean;
}

const NotebookBlockDevider: React.FC<NotebookBlockDeviderProps> = ({
	pageId,
	notebookId,
	previousBlockId,
	showDropzone,
}) => {
	const [createNotebookBlock] = useCreateNotebookBlockMutation();
	const [updateBlockOrder] = useUpdateNotebookBlockOrderMutation();

	const [showMenu, setShowMenu] = useState(false);
	const [isDraggedOver, setIsDraggedOver] = useState(showDropzone ?? false);

	const wrapperRef = useRef<HTMLDivElement>(null);

	const handleAddNotebookBlock = async (type: NotebookBlockType) => {
		setShowMenu(false);
		await createNotebookBlock({ pageId, notebookId, type, previousBlockId });
	};

	const handleUpdateBlockOrder = async (e: DragEvent<HTMLDivElement>) => {
		setIsDraggedOver(false);

		const movedBlockId = e.dataTransfer.getData("notebookBlockId");
		if (movedBlockId === previousBlockId!) return;

		await updateBlockOrder({
			pageId,
			notebookId,
			movedBlockId: movedBlockId,
			previousBlockId: previousBlockId!,
		});

		e.dataTransfer.clearData();
	};

	const handleDragEvent = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.currentTarget.contains(e.relatedTarget as Node)) return;

		setIsDraggedOver(e.type === "dragenter");
	};

	useEffect(() => {
		const clickHandler = (event: MouseEvent) => {
			if (!wrapperRef.current?.contains(event.target as Node)) {
				setShowMenu(false);
			}
		};

		addEventListener("click", clickHandler);
		return () => removeEventListener("click", clickHandler);
	}, []);

	return (
		<div
			ref={wrapperRef}
			className={styles.devider}
			onDragOver={(e) => e.preventDefault()}
			onDragEnter={handleDragEvent}
			onDragLeave={handleDragEvent}
			onDrop={handleUpdateBlockOrder}
		>
			<div
				className={`${styles.devider__control} ${showDropzone ? styles.show__dropzone : ""} ${
					isDraggedOver ? styles.active__dropzone : ""
				}`}
				onClick={() => setShowMenu(true)}
			>
				<div className={`${styles.left__icon} ${showMenu ? styles.active : ""}`}>
					<HiPlus size={18} />
				</div>
				<div className={`${styles.right__line} ${showMenu ? styles.active : ""}`}></div>
			</div>
			{showMenu && <NotebookBlockDeviderMenu onSelect={handleAddNotebookBlock} />}
		</div>
	);
};

export default NotebookBlockDevider;
