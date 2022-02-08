export const truncate = (text: string, maxLen: number = 100) => {
	if (text.length <= maxLen) return text;
	return text.substring(0, maxLen) + "...";
};
