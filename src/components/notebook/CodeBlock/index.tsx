import { CodeBlockContent } from "models";
import { useCallback, useMemo, useState } from "react";
import { Languages, SupportedProgrammingLanguage } from "config/programming-languages";
import { useUpdateNotebookBlockMutation } from "features/notebook/notebookApi";
import useWarnBeforePathChange from "hooks/useWarnBeforePathChange";
import debounce from "lodash.debounce";
import useAuth from "hooks/useAuth";

import CodeBlockLanguageSelect from "../CodeBlockLanguageSelect";
import CodeBlockEditor from "../CodeBlockEditor";
import CodeBlockCopyButton from "../CodeBlockCopyButton";
import NotebookDeleteButton from "../NotebookDeleteButton";

import "prismjs/themes/prism-dark.css";
import styles from "./CodeBlock.module.scss";

interface CodeBlockProps {
	content: string;
	pageId: string;
	notebookId: string;
	id: string;
}

const getInitialData = (content: string): CodeBlockContent => {
	let parsedContent;
	try {
		parsedContent = JSON.parse(content);
	} catch (err) {}

	if (parsedContent?.code && parsedContent?.language) {
		return parsedContent;
	}

	return {
		code: "",
		language: Languages[Object.keys(Languages)[0]].id,
	};
};

const CodeBlock: React.FC<CodeBlockProps> = ({ content, id, notebookId, pageId }) => {
	const data = useMemo(() => getInitialData(content), [content]);
	const { isAuth } = useAuth();

	const [editorValue, setEditorValue] = useState(data.code);
	const [language, setLanguage] = useState(Languages[data.language]);
	const [needsSync, setNeedsSync] = useState(false);

	const [updateNotebookBlock] = useUpdateNotebookBlockMutation();

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

	if (isAuth) {
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
					<NotebookDeleteButton notebookBlockId={id} notebookId={notebookId} pageId={pageId} />
				</div>
			</div>
		);
	}

	return (
		<div className={styles.codeBlock}>
			<CodeBlockEditor value={editorValue} onValueChange={() => {}} language={language} />
		</div>
	);
};

export default CodeBlock;
