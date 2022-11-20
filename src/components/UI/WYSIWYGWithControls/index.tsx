import { EditorState } from "draft-js";
import { FormEvent, useState } from "react";
import WYSIWYG from "../WYSIWYG";
import styles from "./WYSIWYGWithControls.module.scss";

interface WYSIWYGWithControlsProps {
	onCancel: () => void;
	onConfirm: (textValue: string) => void;
	initialHtml: string;
}

const WYSIWYGWithControls: React.FC<WYSIWYGWithControlsProps> = ({ onCancel, onConfirm, initialHtml }) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [htmlValue, setHtmlValue] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onConfirm(htmlValue);
	};

	return (
		<div className={styles.wysiwyg__with__controls}>
			<form onSubmit={handleSubmit}>
				<WYSIWYG
					editorState={editorState}
					onStateUpdate={setEditorState}
					html={initialHtml}
					onHtmlChange={setHtmlValue}
					tags={["H1", "H2", "H3", "H4", "H5", "H6", "Italic", "OL", "UL", "Underline", "Bold", "Monospace"]}
				/>
				<div className={styles.btn__container}>
					<button
						type="submit"
						className={styles.cofirm__btn}
						disabled={initialHtml === htmlValue || !htmlValue}
					>
						Confirm
					</button>
					<button onClick={onCancel} className={styles.cofirm__btn} type="button">
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default WYSIWYGWithControls;
