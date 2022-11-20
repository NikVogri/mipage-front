import { EditorState } from "draft-js";
import { WYSIWYGBlockTypes, WYSIWYGInlineStyles } from "models";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { BiArrowToLeft, BiBold, BiCode, BiItalic, BiRedo, BiReset, BiUnderline, BiUndo } from "react-icons/bi";

import styles from "./WYSIWYGHeader.module.scss";

interface WYSIWYGHeaderProps {
	tags: (WYSIWYGBlockTypes | WYSIWYGInlineStyles)[];
	onBlockTypeChange: (type: string) => void;
	onInlineStyleChange: (type: string) => void;
	className?: string;
	editorState: EditorState;
	onUndo: () => void;
	onRedo: () => void;
}

const BLOCK_TYPES: { label: WYSIWYGBlockTypes; style: string }[] = [
	{ label: "H1", style: "header-one" },
	{ label: "H2", style: "header-two" },
	{ label: "H3", style: "header-three" },
	{ label: "H4", style: "header-four" },
	{ label: "H5", style: "header-five" },
	{ label: "H6", style: "header-six" },
	{ label: "UL", style: "unordered-list-item" },
	{ label: "OL", style: "ordered-list-item" },
];

const INLINE_STYLES: { label: WYSIWYGInlineStyles; style: string; icon: ReactElement<any, any> }[] = [
	{ label: "Bold", style: "BOLD", icon: <BiBold /> },
	{ label: "Italic", style: "ITALIC", icon: <BiItalic /> },
	{ label: "Underline", style: "UNDERLINE", icon: <BiUnderline /> },
	{ label: "Monospace", style: "CODE", icon: <BiCode /> },
];

const WYSIWYGHeader: React.FC<WYSIWYGHeaderProps> = ({
	onBlockTypeChange,
	onInlineStyleChange,
	tags,
	className,
	editorState,
	onUndo,
	onRedo,
}) => {
	const [activeStyles, setActiveStyles] = useState<Immutable.OrderedSet<string>>();
	const blockTypes = BLOCK_TYPES.filter((bt) => tags.includes(bt.label));
	const inlineStyles = INLINE_STYLES.filter((is) => tags.includes(is.label));

	const getBlockType = useCallback(() => {
		const selection = editorState.getSelection();
		return editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
	}, [editorState]);

	useEffect(() => {
		setActiveStyles(editorState.getCurrentInlineStyle());
	}, [editorState]);

	return (
		<div className={`${styles.header} ${className ? className : ""}`}>
			{blockTypes.map((bt) => (
				<button
					type="button"
					key={bt.style}
					onMouseDown={(e) => {
						e.preventDefault();
						onBlockTypeChange(bt.style);
					}}
					title={bt.label}
					data-selected={getBlockType() == bt.style ? true : undefined}
				>
					<span>{bt.label}</span>
				</button>
			))}
			{inlineStyles.map((is) => (
				<button
					type="button"
					key={is.style}
					onMouseDown={(e) => {
						e.preventDefault();
						onInlineStyleChange(is.style);
					}}
					title={is.label}
					data-selected={activeStyles?.has(is.style) ? true : undefined}
				>
					<span>{is.icon}</span>
				</button>
			))}

			<button type="button" onMouseDown={onUndo} title={"Undo"}>
				<span>
					<BiUndo />
				</span>
			</button>
			<button type="button" onMouseDown={onRedo} title={"Redo"}>
				<span>
					<BiRedo />
				</span>
			</button>
		</div>
	);
};

export default WYSIWYGHeader;
