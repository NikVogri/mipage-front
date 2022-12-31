import debounce from "lodash.debounce";
import { Editor, EditorCommand, EditorState, RichUtils } from "draft-js";
import { useUpdateNotebookBlockMutation } from "features/notebook/notebookApi";
import { getInitEditorState, editorContentToRawString } from "helpers/editor";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useWarnBeforePathChange from "hooks/useWarnBeforePathChange";

import NotebookEditorToolbar from "../NotebookEditorToolbar";

import styles from "./RichTextBlock.module.scss";
import NotebookDeleteButton from "../NotebookDeleteButton";

interface RichTextBlockProps {
	content: string;
	pageId: string;
	notebookId: string;
	id: string;
}

// TODO: this is used in multiple locations. Make is re-usable.
const styleMap = {
	CODE: {
		backgroundColor: "var(--background-card)",
		padding: "0.2rem 0.5rem",
		borderRadius: "0.5rem",
		border: "solid 1px var(--outline)",
	},
};

const RichTextBlock: React.FC<RichTextBlockProps> = ({ content, pageId, notebookId, id }) => {
	const initialEditorState = useMemo(() => getInitEditorState(content), [content]);

	const [needsSync, setNeedsSync] = useState(false);
	const [editorState, setEditorState] = useState(initialEditorState);
	const [isGettingDeleted, setIsGettingDeleted] = useState(false);

	const [updateNotebookBlock] = useUpdateNotebookBlockMutation();

	const editorRef = useRef<Editor>(null);

	useEffect(() => {
		editorRef.current?.focus();
	}, []);

	const debounceSave = useCallback(
		debounce(async (newEditorState: EditorState) => {
			await updateNotebookBlock({
				content: editorContentToRawString(newEditorState),
				pageId,
				notebookId,
				notebookBlockId: id,
			});

			setNeedsSync(false);
		}, 750),
		[pageId, notebookId, id]
	);

	useWarnBeforePathChange(needsSync, () => {
		const userConfirmed = confirm("You have unsaved changes. Are you sure you want to leave this page?");

		if (userConfirmed) {
			setNeedsSync(false);
		}

		return userConfirmed;
	});

	const handleKeyCommand = (command: EditorCommand, editorState: EditorState) => {
		const newState = RichUtils.handleKeyCommand(editorState, command);

		if (newState) {
			updateEditorState(newState);
			return "handled";
		}

		return "not-handled";
	};

	const updateEditorState = (newEditorState: EditorState) => {
		if (newEditorState.getCurrentContent() !== editorState.getCurrentContent()) {
			setNeedsSync(true);
			debounceSave(newEditorState);
		}

		setEditorState(newEditorState);
	};

	const handleIsGettingDeleted = () => {
		setIsGettingDeleted(true);
		setNeedsSync(false);
	};

	return (
		<div className={`${styles.rich_text_block} ${isGettingDeleted ? styles.disabled : ""}`} id={`editor-${id}`}>
			<NotebookEditorToolbar editorState={editorState} setEditorState={updateEditorState} id={id} />
			<Editor
				editorState={editorState}
				onChange={updateEditorState}
				handleKeyCommand={handleKeyCommand}
				customStyleMap={styleMap}
				readOnly={isGettingDeleted}
				ref={editorRef}
			/>
			<div className={styles.rich_text_block__controls}>
				<NotebookDeleteButton
					onBeforeDelete={handleIsGettingDeleted}
					notebookBlockId={id}
					notebookId={notebookId}
					pageId={pageId}
				/>
			</div>
		</div>
	);
};

export default RichTextBlock;
