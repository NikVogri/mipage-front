import { EditorState, RichUtils } from "draft-js";
import { useEffect, useRef, useState } from "react";

import WYSIWYGHeader from "components/UI/WYSIWYGHeader";

import styles from "./NotebookEditorToolbar.module.scss";

interface EditorToolbarProps {
	editorState: EditorState;
	setEditorState: (newState: EditorState) => void;
	id: string;
}

const NotebookEditorToolbar: React.FC<EditorToolbarProps> = ({ editorState, setEditorState, id }) => {
	const [showToolbar, setShowToolbar] = useState(false);
	const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });

	const toggleInlineStyle = (style: string) => {
		setEditorState(RichUtils.toggleInlineStyle(editorState, style));
	};

	const toggleBlockType = (type: string) => {
		setEditorState(RichUtils.toggleBlockType(editorState, type));
	};

	const handleUndo = () => {
		setEditorState(EditorState.undo(editorState));
	};

	const handleRedo = () => {
		setEditorState(EditorState.redo(editorState));
	};

	const toolbarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleMouseEvent = (e: MouseEvent) => {
			const targetElement = e.target! as HTMLElement;
			const selection = window.getSelection()?.toString();
			const editor = document.getElementById(`editor-${id}`)!;

			if (
				selection &&
				selection.trim().length >= 1 &&
				editor.contains(targetElement) &&
				!toolbarRef.current?.contains(targetElement) // Prevent toolbar from repositioning when clicking on it
			) {
				// Custom defined offset to prevent toolbar from covering the highlighted text
				const offsetY = 50;
				const offsetX = 10;

				// Editor bounds
				const parentBounds = editor.getBoundingClientRect();

				// Editor container relative 'top' and 'left' toolbar position in px
				const targetBounds = targetElement.getBoundingClientRect();
				let localX = Math.abs(parentBounds.left - targetBounds.left) - offsetX;
				let localY = Math.abs(parentBounds.top - targetBounds.top) - offsetY;

				// Minimum px between highest editor and page center border
				const minEditorOffsetTop = 30;

				// Make sure toolbar does not show outside of editor bounds
				if (localY < 0 && editor.offsetTop < minEditorOffsetTop) {
					localY += targetBounds.height + offsetY;
				}

				if (localX < 0) {
					localX = 0;
				}

				setToolbarPosition({ x: localX, y: localY });
				setShowToolbar(true);
			} else if (!toolbarRef.current?.contains(targetElement)) {
				setShowToolbar(false);
			}
		};

		window.addEventListener("mouseup", handleMouseEvent);
		window.addEventListener("dblclick", handleMouseEvent);

		return () => {
			window.removeEventListener("mouseup", handleMouseEvent);
			window.removeEventListener("dblclick", handleMouseEvent);
		};
	}, [id]);

	if (!showToolbar) {
		return <div></div>;
	}

	return (
		<div
			ref={toolbarRef}
			style={{ top: toolbarPosition.y, left: toolbarPosition.x }}
			className={styles.notebook_editor_toolbar}
		>
			<WYSIWYGHeader
				editorState={editorState}
				tags={["H1", "H2", "H3", "Bold", "Italic", "Monospace", "OL", "UL", "Underline"]}
				onBlockTypeChange={toggleBlockType}
				onInlineStyleChange={toggleInlineStyle}
				onUndo={handleUndo}
				onRedo={handleRedo}
			/>
		</div>
	);
};

export default NotebookEditorToolbar;
