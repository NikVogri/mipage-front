import { EditorState, RichUtils } from "draft-js";
import { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { BiBold, BiItalic, BiStrikethrough, BiUnderline, BiHeading } from "react-icons/bi";

import EditorTool from "../EditorTool";
// import EditorToolDropdown from "../EditorToolDropdown";

import styles from "./EditorToolbar.module.scss";

interface EditorToolbarProps {
	editorState: EditorState;
	setEditorState: (newState: EditorState) => void;
	id: string;
}

interface Widget {
	name: string;
	icon?: ReactElement<any, any>;
}

interface InlineStyle extends Widget {
	type: "richtext";
}

interface ContentBlock extends Widget {
	type: "block";
	dropdown: boolean;
	children?: {
		name: string;
		text: string;
	}[];
}

const inlineStyles: InlineStyle[] = [
	{
		name: "BOLD",
		icon: <BiBold size={23} />,
		type: "richtext",
	},
	{
		name: "ITALIC",
		icon: <BiItalic size={23} />,
		type: "richtext",
	},
	{
		name: "UNDERLINE",
		icon: <BiStrikethrough size={23} />,
		type: "richtext",
	},
	{
		name: "STRIKETHROUGH",
		icon: <BiUnderline size={23} />,
		type: "richtext",
	},
];

// export const contentBlocks: ContentBlock[] = [
// 	{
// 		name: "heading",
// 		icon: <BiHeading size={23} />,
// 		type: "block",
// 		dropdown: true,
// 		children: [
// 			{
// 				name: "header-one",
// 				text: "H1",
// 			},
// 			{
// 				name: "header-two",
// 				text: "H2",
// 			},
// 			{
// 				name: "header-three",
// 				text: "H3",
// 			},
// 			{
// 				name: "header-four",
// 				text: "H4",
// 			},
// 			{
// 				name: "header-five",
// 				text: "H5",
// 			},
// 			{
// 				name: "header-six",
// 				text: "H6",
// 			},
// 		],
// 	},
// ];

const EditorToolbar: React.FC<EditorToolbarProps> = ({ editorState, setEditorState, id }) => {
	const [showToolbar, setShowToolbar] = useState(false);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

	const activeStyles = useMemo(() => {
		return editorState.getCurrentInlineStyle();
	}, [editorState]);

	const handleToggleInlineStyle = (inlineStyle: string) => {
		setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
	};

	const toolbarRef = useRef(null);

	useEffect(() => {
		const handleMouseEvent = (e: MouseEvent) => {
			const selection = window.getSelection()?.toString();
			const editor = document.querySelector(`.editor-${id}`);

			if (selection && selection.trim().length > 1 && editor!.contains(e.target as Node)) {
				const { x, y } = e;
				setShowToolbar(true);
				setMousePos({ x, y });

				return;
			}

			if (toolbarRef.current && !(toolbarRef.current as Node).contains(e.target as Node)) {
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
		<div ref={toolbarRef} style={{ top: mousePos.y - 55, left: mousePos.x - 10 }} className={styles.editor_toolbar}>
			{inlineStyles.map((style) => (
				<EditorTool
					key={style.name}
					onClick={() => handleToggleInlineStyle(style.name)}
					icon={style.icon!}
					active={activeStyles.includes(style.name)}
				/>
			))}
			{/* {contentBlocks.map((style) => (
				<EditorToolDropdown
					key={style.name}
					onClick={() => handleToggleInlineStyle(style.name)}
					icon={style.icon!}
					active={activeStyles.includes(style.name)}
					dropdownChildren={style.children!}
				/>
			))} */}
		</div>
	);
};

export default EditorToolbar;
