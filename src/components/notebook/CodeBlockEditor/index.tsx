import { SupportedProgrammingLanguage } from "config/programming-languages";
import { isGrammarLoaded, loadLanguageGrammar } from "helpers/prism";
import { useEffect } from "react";
import useForceRerender from "hooks/useForceRerender";

import Editor from "react-simple-code-editor";
import Prism from "prismjs";

import styles from "./CodeBlockEditor.module.scss";

interface CodeBlockEditorProps {
	value: string;
	onValueChange: (value: string) => void;
	language: SupportedProgrammingLanguage;
}

const CodeBlockEditor: React.FC<CodeBlockEditorProps> = ({ value, onValueChange, language }) => {
	const forceRerender = useForceRerender();

	useEffect(() => {
		if (!isGrammarLoaded(language.id)) {
			handleLoadGrammar();
		}
	}, [language]);

	const handleLoadGrammar = async () => {
		await loadLanguageGrammar(language);

		// There was a problem where language grammar was not loaded, causing the 'highlight' function to render
		// encoded code value instead of the highlighted one.
		//
		// The following solution might not be the best, but since the language gets lazy loaded there
		// is no good alternative, but to force re-render when the grammar loads.
		forceRerender();
	};

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
			autoFocus
		/>
	);
};

export default CodeBlockEditor;
