import { convertFromRaw, DraftModel } from "draft-js";

export const parseEditorContentRawString = (rawContentString: string): DraftModel.ImmutableData.ContentState => {
	const rawContent = JSON.parse(rawContentString);
	return convertFromRaw(rawContent);
};
