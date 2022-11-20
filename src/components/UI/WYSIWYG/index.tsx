import { Editor, EditorState, RichUtils, EditorCommand } from "draft-js";
import { convertFromHTML, convertToHTML } from "draft-convert";
import { WYSIWYGBlockTypes, WYSIWYGInlineStyles } from "models";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import WYSIWYGHeader from "../WYSIWYGHeader";

import "draft-js/dist/Draft.css";
import styles from "./WYSIWYG.module.scss";

interface WYSIWYGProps {
	onHtmlChange: (state: string) => void;
	editorState: EditorState;
	onStateUpdate: Dispatch<SetStateAction<EditorState>>;
	html?: string;
	tags: (WYSIWYGBlockTypes | WYSIWYGInlineStyles)[];
	headerClass?: string;
	editorClass?: string;
	className?: string;
}

const styleMap = {
	CODE: {
		backgroundColor: "var(--background-card)",
		padding: "0.2rem 0.5rem",
		borderRadius: "0.5rem",
		border: "solid 1px var(--outline)",
	},
};

const WYSIWYG: React.FC<WYSIWYGProps> = ({
	editorState,
	onStateUpdate,
	onHtmlChange,
	headerClass,
	editorClass,
	className,
	html,
	tags,
}) => {
	useEffect(() => {
		if (html) {
			onStateUpdate(EditorState.createWithContent(convertFromHTML(html)));
		}
	}, []);

	const handleStateChange = (newState: EditorState) => {
		onStateUpdate(newState);

		let html = convertToHTML({
			blockToHTML: (block) => {
				console.log(block);
				if (!block.text) {
					return <br />;
				}
			},
		})(newState.getCurrentContent());

		// remove <br/> if the html string contains only that tag
		if (html === "<br/>") {
			html = "";
		}

		onHtmlChange(html);
	};

	const toggleInlineStyle = (style: string) => {
		onStateUpdate(RichUtils.toggleInlineStyle(editorState, style));
	};

	const toggleBlockType = (type: string) => {
		onStateUpdate(RichUtils.toggleBlockType(editorState, type));
	};

	const onUndo = () => {
		onStateUpdate(EditorState.undo(editorState));
	};

	const onRedo = () => {
		onStateUpdate(EditorState.redo(editorState));
	};

	const handleKeyCommand = (command: EditorCommand, editorState: EditorState) => {
		const newState = RichUtils.handleKeyCommand(editorState, command);

		if (newState) {
			onStateUpdate(newState);
			return "handled";
		}

		return "not-handled";
	};

	return (
		<div className={`${className ? className : ""} ${styles.wysiwyg}`}>
			<WYSIWYGHeader
				editorState={editorState}
				onInlineStyleChange={toggleInlineStyle}
				onBlockTypeChange={toggleBlockType}
				onUndo={onUndo}
				onRedo={onRedo}
				className={headerClass}
				tags={tags}
			/>
			<div className={`${editorClass ? editorClass : ""} ${styles.editor}`}>
				<Editor
					editorState={editorState}
					onChange={handleStateChange}
					handleKeyCommand={handleKeyCommand}
					customStyleMap={styleMap}
				/>
			</div>
		</div>
	);
};

export default WYSIWYG;
