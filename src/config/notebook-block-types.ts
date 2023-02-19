import { NotebookBlockType, NotebookBlockTypeItem } from "models";
import { MdOutlineTextFields, MdCode } from "react-icons/md";

export const notebookblockTypes: NotebookBlockTypeItem[] = [
	{
		title: "Text Editor",
		subtitle: "A simple text editor",
		icon: MdOutlineTextFields,
		type: NotebookBlockType.richText,
		disabled: false,
	},
	{
		title: "Code",
		subtitle: "Code editor with support for multiple languages",
		icon: MdCode,
		type: NotebookBlockType.code,
		disabled: false,
	},
];
