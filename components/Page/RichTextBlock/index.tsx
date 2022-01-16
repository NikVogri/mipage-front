import { Editor, EditorState } from "draft-js";
import { useUpdateNotebookBlockMutation } from "features/notebook/notebookApi";
import { editorContentToRawString } from "helpers/editorContentToRawString";
import { parseEditorContentRawString } from "helpers/parseEditorContentRawString";
import { useEffect, useMemo, useRef, useState } from "react";
import useEditorAutosave from "hooks/useEditorAutosave";

import EditorToolbar from "../Editor/EditorToolbar";

import styles from "./RichTextBlock.module.scss";

interface RichTextBlockProps {
	content: string;
	token: string;
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

const RichTextBlock: React.FC<RichTextBlockProps> = ({ content, token, pageId, notebookId, id }) => {
	const initialEditorState = useMemo(() => getInitEditorState(content), [content]);

	const editorStateRef = useRef(initialEditorState);
	const [updateNotebookBlock, { isError, error }] = useUpdateNotebookBlockMutation();
	const [currentEditorState, setCurrentEditorState] = useState(() => initialEditorState);

	const { createAutosaveTimeout, autosaveActive } = useEditorAutosave(editorStateRef.current, async () => {
		const stringifiedRawContent = editorContentToRawString(editorStateRef.current);
		await updateNotebookBlock({ content: stringifiedRawContent, token, pageId, notebookId, notebookBlockId: id });
	});

	const setEditorState = (newState: EditorState) => {
		if (!autosaveActive) {
			createAutosaveTimeout(newState);
		}

		editorStateRef.current = newState;
		setCurrentEditorState(newState);
	};

	if (isError) {
		console.log(error); // TODO: Handle error
	}

	return (
		<div className={styles.rich_text_block}>
			<EditorToolbar editorState={currentEditorState} setEditorState={setEditorState} />
			<Editor editorState={currentEditorState} onChange={setEditorState} />
		</div>
	);
};

export default RichTextBlock;
