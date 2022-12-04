import { Editor, EditorState } from "draft-js";
import debounce from "lodash.debounce";
import { useUpdateNotebookBlockMutation } from "features/notebook/notebookApi";
import { editorContentToRawString } from "helpers/editorContentToRawString";
import { parseEditorContentRawString } from "helpers/parseEditorContentRawString";
import { useCallback, useMemo, useState } from "react";
import useWarnBeforePathChange from "hooks/useWarnBeforePathChange";

import EditorToolbar from "../EditorToolbar";

import styles from "./RichTextBlock.module.scss";

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
		} catch (err) {
			console.log("Could not parse content", err);
		}
	}

	return EditorState.createEmpty();
};

const RichTextBlock: React.FC<RichTextBlockProps> = ({ content, pageId, notebookId, id }) => {
	const initialEditorState = useMemo(() => getInitEditorState(content), [content]);

	const [needsSync, setNeedsSync] = useState(false);
	const [editorState, setEditorState] = useState(initialEditorState);

	const [updateNotebookBlock] = useUpdateNotebookBlockMutation();

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

	const updateEditorState = (newEditorState: EditorState) => {
		if (newEditorState.getCurrentContent() !== editorState.getCurrentContent()) {
			setNeedsSync(true);
			debounceSave(newEditorState);
		}

		setEditorState(newEditorState);
	};

	return (
		<div className={styles.rich_text_block}>
			<EditorToolbar editorState={editorState} setEditorState={updateEditorState} id={id} />
			<div className={`editor-${id}`}>
				<Editor editorState={editorState} onChange={updateEditorState} />
			</div>
		</div>
	);
};

export default RichTextBlock;
