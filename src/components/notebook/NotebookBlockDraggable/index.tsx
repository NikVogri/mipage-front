import { DragEvent, ReactElement, useRef, useState } from "react";
import { MdDragHandle } from "react-icons/md";

import styles from "./NotebookBlockDraggable.module.scss";

interface NotebookBlockDraggableProps {
	children: ReactElement;
	notebookBlockId: string;
	onDragChange: (isDragged: boolean) => void;
}

const NotebookBlockDraggable: React.FC<NotebookBlockDraggableProps> = ({ notebookBlockId, children, onDragChange }) => {
	const [isDragged, setIsDragged] = useState(false);
	const draggableRef = useRef<HTMLDivElement>(null);

	const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
		e.dataTransfer.setData("notebookBlockId", notebookBlockId);
		e.dataTransfer.setDragImage(draggableRef.current!, 0, 0);

		if (!isDragged) {
			setDragState(true);
		}
	};

	const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();

		if (isDragged) {
			setDragState(false);
		}
	};

	const setDragState = (isDragged: boolean) => {
		setIsDragged(isDragged);
		onDragChange(isDragged);
	};

	return (
		<div className={`${styles.draggable} ${isDragged ? styles.draggable__active : ""}`} ref={draggableRef}>
			<div
				className={styles.draggable__icon__container}
				draggable
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				<MdDragHandle className={styles.draggable__icon} size={24} />
			</div>
			<div className={styles.content}>{children}</div>
		</div>
	);
};

export default NotebookBlockDraggable;
