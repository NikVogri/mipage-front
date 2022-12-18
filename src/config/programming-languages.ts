import { languages } from "prismjs";

export interface SupportedProgrammingLanguage {
	id: string;
	title: string;
	dependencies?: string[];
}

export const Languages: Record<string, SupportedProgrammingLanguage> = {
	javascript: {
		id: "javascript",
		title: "Javascript",
	},
	css: {
		id: "css",
		title: "CSS",
	},
	sass: {
		id: "sass",
		title: "Sass",
	},
	["xml-doc"]: {
		id: "xml-doc",
		title: "XML Doc",
	},
	solidity: {
		id: "solidity",
		title: "Solidity",
	},
	html: {
		id: "html",
		title: "HTML",
	},
	csv: {
		id: "csv",
		title: "CSV",
	},
	fortran: {
		id: "fortran",
		title: "Fortran",
	},
	fsharp: {
		id: "fsharp",
		title: "F#",
	},
	markdown: {
		id: "markdown",
		title: "Markdown",
	},
	autohotkey: {
		id: "autohotkey",
		title: "AutoHotkey",
	},
	bash: {
		id: "bash",
		title: "Bash",
	},
	c: {
		id: "c",
		title: "C",
	},
	csharp: {
		id: "csharp",
		title: "C#",
	},
	cpp: {
		id: "cpp",
		title: "C++",
	},
	clojure: {
		id: "clojure",
		title: "Clojure",
	},
	cobol: {
		id: "cobol",
		title: "Cobol",
	},
	dart: {
		id: "dart",
		title: "Dart",
	},
	docker: {
		id: "docker",
		title: "Docker",
	},
	elixir: {
		id: "elixir",
		title: "Elixir",
	},
	erlang: {
		id: "erlang",
		title: "Erlang",
	},
	go: {
		id: "go",
		title: "GO",
	},
	graphql: {
		id: "graphql",
		title: "GraphQL",
	},
	groovy: {
		id: "groovy",
		title: "Groovy",
	},
	haskell: {
		id: "haskell",
		title: "Haskell",
	},
	java: {
		id: "java",
		title: "Java",
	},
	javadoc: {
		id: "javadoc",
		title: "Javadoc",
		dependencies: ["javadoclike"],
	},
	javadoclike: {
		id: "javadoclike",
		title: "Javadoc-like",
	},
	json: {
		id: "json",
		title: "JSON",
	},
	julia: {
		id: "julia",
		title: "Julia",
	},
	jolie: {
		id: "jolie",
		title: "Jolie",
	},
	jsx: {
		id: "jsx",
		title: "Jsx",
	},
	tsx: {
		id: "tsx",
		title: "Tsx",
		dependencies: ["typescript", "jsx"],
	},
	kotlin: {
		id: "kotlin",
		title: "Kotlin",
	},
	lua: {
		id: "lua",
		title: "Lua",
	},
	typescript: {
		id: "typescript",
		title: "TypeScript",
	},
	coffeescript: {
		id: "coffeescript",
		title: "CoffeeScript",
	},
	yaml: {
		id: "yaml",
		title: "YAML",
	},
	python: {
		id: "python",
		title: "Python",
	},
	aspnet: {
		id: "aspnet",
		title: "ASP Net",
	},
	chaiscript: {
		id: "chaiscript",
		title: "ChaiScript",
	},
	rust: {
		id: "rust",
		title: "Rust",
	},
};
