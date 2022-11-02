export const truncate = (text: string, maxLen: number = 100) => {
	if (text.length <= maxLen) return text;
	return text.substring(0, maxLen) + "...";
};

export const pluralize = (noun: string, count: number) => {
	if (count === 1) return noun;
	else return `${noun}s`;
};
