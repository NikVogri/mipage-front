import { Languages, SupportedProgrammingLanguage } from "config/programming-languages";
import { languages } from "prismjs";

export const loadLanguageGrammar = async (language: SupportedProgrammingLanguage) => {
	if (isGrammarLoaded(language.id)) return;

	if (language.dependencies && language.dependencies.length > 0) {
		for (const dependencyLanguageId of language.dependencies) {
			await loadLanguageGrammar(Languages[dependencyLanguageId]);
		}
	}

	try {
		await import("prismjs/components/prism-" + language.id);
	} catch (err) {
		console.warn(
			`Mipage does currently not support '${language.title}' language. If you require additional languages please contact Mipage support.`
		);
	}
};

export const isGrammarLoaded = (languageId: string) => {
	return !!languages[languageId];
};
