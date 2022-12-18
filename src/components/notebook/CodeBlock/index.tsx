import { CodeBlockContent } from "models";
import { useCallback, useEffect, useState } from "react";
import { Languages, SupportedProgrammingLanguage } from "config/programming-languages";
import { isGrammarLoaded, loadLanguageGrammar } from "helpers/prism";
import { useUpdateNotebookBlockMutation } from "features/notebook/notebookApi";
import useWarnBeforePathChange from "hooks/useWarnBeforePathChange";
import debounce from "lodash.debounce";

import CodeBlockLanguageSelect from "../CodeBlockLanguageSelect";
import CodeBlockEditor from "../CodeBlockEditor";
import CodeBlockCopyButton from "../CodeBlockCopyButton";
import CodeBlockDeleteButton from "../CodeBlockDeleteButton";

import "prismjs/themes/prism-dark.css";
import styles from "./CodeBlock.module.scss";
import useForceRerender from "hooks/useForceRerender";

interface CodeBlockProps {
	content: CodeBlockContent;
	pageId: string;
	notebookId: string;
	id: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ content, id, notebookId, pageId }) => {
	const [editorValue, setEditorValue] = useState(content.code ?? "");
	const [needsSync, setNeedsSync] = useState(false);
	const [language, setLanguage] = useState(Languages[content.language] ?? Languages[Object.keys(Languages)[0]]);

	const forceRerender = useForceRerender();

	const [updateNotebookBlock] = useUpdateNotebookBlockMutation();

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

	const handleEditorStateChange = (newValue: string) => {
		if (newValue !== editorValue) {
			setNeedsSync(true);
			debounceSave({ language: language.id, code: newValue });
		}

		setEditorValue(newValue);
	};

	const handleLanguageSelect = (newLanguage: SupportedProgrammingLanguage) => {
		if (newLanguage.id !== language.id) {
			setNeedsSync(true);
			debounceSave({ language: newLanguage.id, code: editorValue });
		}

		setLanguage(newLanguage);
	};

	const debounceSave = useCallback(
		debounce(async (content: CodeBlockContent) => {
			await updateNotebookBlock({
				pageId: pageId,
				notebookId: notebookId,
				notebookBlockId: id,
				content: JSON.stringify(content),
			});

			setNeedsSync(false);
		}, 750),
		[pageId, notebookId, id]
	);

	useWarnBeforePathChange(needsSync, () => {
		const userConfirmed = confirm("You have unsaved changes. Are you sure you want to leave this page?");

		if (userConfirmed) {
			setNeedsSync(false);
		}

		return userConfirmed;
	});

	return (
		<div className={styles.codeBlock}>
			<CodeBlockEditor value={editorValue} onValueChange={handleEditorStateChange} language={language} />
			<div className={styles.codeBlock_controls}>
				<CodeBlockLanguageSelect
					languages={Object.values(Languages)}
					selected={language}
					onSelect={handleLanguageSelect}
				/>
				<CodeBlockCopyButton code={editorValue} />
				<CodeBlockDeleteButton notebookBlockId={id} notebookId={notebookId} pageId={pageId} />
			</div>
		</div>
	);
};

export default CodeBlock;
