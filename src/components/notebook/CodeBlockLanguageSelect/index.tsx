import { Languages, SupportedProgrammingLanguage } from "config/programming-languages";
import { ChangeEvent, useMemo } from "react";

import styles from "./CodeBlockLanguageSelect.module.scss";

interface CodeBlockLanguageSelectProps {
	onSelect: (lang: SupportedProgrammingLanguage) => void;
	languages: SupportedProgrammingLanguage[];
	selected: SupportedProgrammingLanguage;
}

const CodeBlockLanguageSelect: React.FC<CodeBlockLanguageSelectProps> = ({ onSelect, selected, languages }) => {
	const sortedLanguages = useMemo(() => languages.sort((a, b) => a.id.localeCompare(b.id)), [languages]);

	const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		onSelect(Languages[e.target.value]);
	};

	return (
		<select onChange={handleSelect} value={selected?.id} className={styles.select}>
			{sortedLanguages.map((l) => (
				<option value={l.id} key={l.id}>
					{l.title}
				</option>
			))}
		</select>
	);
};

export default CodeBlockLanguageSelect;
