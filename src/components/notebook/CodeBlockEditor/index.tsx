import { SupportedProgrammingLanguage } from "config/programming-languages";
import { isGrammarLoaded } from "helpers/prism";

import Editor from "react-simple-code-editor";
import Prism from "prismjs";

import styles from "./CodeBlockEditor.module.scss";

interface CodeBlockEditorProps {
	value: string;
	onValueChange: (value: string) => void;
	language: SupportedProgrammingLanguage;
}

const CodeBlockEditor: React.FC<CodeBlockEditorProps> = ({ value, onValueChange, language }) => {
	const highlight = (code: string) => {
		if (isGrammarLoaded(language.id)) {
			return Prism.highlight(code, Prism.languages[language.id], language.id);
		}

		return Prism.util.encode(code);
	};

	return (
		<Editor
			value={value}
			onValueChange={onValueChange}
			highlight={highlight}
			padding={10}
			textareaClassName={styles.editor_textarea}
			preClassName={styles.editor_pre}
			className={styles.editor}
			lang={language.id}
		/>
	);
};

export default CodeBlockEditor;
