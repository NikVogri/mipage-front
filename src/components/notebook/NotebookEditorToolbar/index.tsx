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
			const targetElement = e.target as Node;
			const selection = window.getSelection()?.toString();
			const editor = document.getElementById(`editor-${id}`)!;

			// TODO: potentially use the highlighted element as the anchor point for the coordinates.
			// It didn't work for me at the moment - deeper research needed.
			// The current implementation also works fine.

			if (
				selection &&
				selection.trim().length >= 1 &&
				editor.contains(targetElement) &&
				!toolbarRef.current?.contains(targetElement) // Prevent toolbar from repositioning when clicking on it
			) {
				// Custom defined offset to prevent toolbar from covering the highlighted text
				const offsetY = 50;
				const offsetX = 35;
				const textHeightOffset = 16;

				// Client page full size
				const pageX = e.clientX;
				const pageY = e.clientY;

				// Editor bounds
				const bounds = editor.getBoundingClientRect();
				const leftBound = bounds!.left;
				const topBound = bounds!.top;

				// Editor container relative 'top' and 'left' toolbar position in px
				const localX = pageX - leftBound - offsetX;
				const localY = pageY - topBound - offsetY - textHeightOffset;

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
