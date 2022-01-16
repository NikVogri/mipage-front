import { convertToRaw, EditorState } from "draft-js";

export const editorContentToRawString = (editorState: EditorState): string => {
	const rawContent = convertToRaw(editorState.getCurrentContent());
	return JSON.stringify(rawContent);
};
