import { convertFromRaw, convertToRaw, DraftModel, EditorState } from "draft-js";

export const parseEditorContentRawString = (rawContentString: string): DraftModel.ImmutableData.ContentState => {
	const rawContent = JSON.parse(rawContentString);
	return convertFromRaw(rawContent);
};

export const editorContentToRawString = (editorState: EditorState): string => {
	const rawContent = convertToRaw(editorState.getCurrentContent());
	return JSON.stringify(rawContent);
};

export const getInitEditorState = (rawContentString: any): EditorState => {
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
