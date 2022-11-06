import { Editor, EditorState } from "draft-js";
import { useUpdateNotebookBlockMutation } from "features/notebook/notebookApi";
import { editorContentToRawString } from "helpers/editorContentToRawString";
import { parseEditorContentRawString } from "helpers/parseEditorContentRawString";
import { useMemo, useRef, useState } from "react";
import useEditorAutosave from "hooks/useEditorAutosave";

import EditorToolbar from "../EditorToolbar";

import styles from "./RichTextBlock.module.scss";
import useWarnBeforePathChange from "hooks/useWarnBeforePathChange";

interface RichTextBlockProps {
	content: string;
	pageId: string;
	notebookId: string;
	id: string;
}

const getInitEditorState = (rawContentString: any): EditorState => {
	if (rawContentString) {
		try {
			const content = parseEditorContentRawString(rawContentString);
			return EditorState.createWithContent(content);
		} catch (error) {
			console.log("Could not parse content", error); // TODO: Handle error
		}
	}

	return EditorState.createEmpty();
};

const RichTextBlock: React.FC<RichTextBlockProps> = ({ content, pageId, notebookId, id }) => {
	const initialEditorState = useMemo(() => getInitEditorState(content), [content]);
	const editorStateRef = useRef(initialEditorState);
	const [updateNotebookBlock, { isError, error }] = useUpdateNotebookBlockMutation();
	const [currentEditorState, setCurrentEditorState] = useState(() => initialEditorState);

	const { needsSync, setNeedsSync } = useEditorAutosave(async () => {
		const stringifiedRawContent = editorContentToRawString(editorStateRef.current);
		await updateNotebookBlock({
			content: stringifiedRawContent,
			pageId,
			notebookId,
			notebookBlockId: id,
		});
	});

	useWarnBeforePathChange(needsSync, () => {
		const userConfirmed = confirm("You have unsaved changes. Are you sure you want to leave this page?");

		if (userConfirmed) {
			setNeedsSync(false);
		}

		return userConfirmed;
	});

	const setEditorState = (newState: EditorState) => {
		if (!needsSync) {
			setNeedsSync(true);
		}

		editorStateRef.current = newState;
		setCurrentEditorState(newState);
	};

	if (isError) {
		console.log(error); // TODO: Handle error
	}

	return (
		<div className={styles.rich_text_block}>
			<EditorToolbar editorState={currentEditorState} setEditorState={setEditorState} id={id} />
			<div className={`editor-${id}`}>
				<Editor editorState={currentEditorState} onChange={setEditorState} />
			</div>
			--
		</div>
	);
};

export default RichTextBlock;
