export const getRgbaFromChar = (char: string, opacity: number): string => {
	const charLower = char.toLowerCase().charCodeAt(0);
	const colorNum = charLower.toString() + charLower.toString() + charLower.toString();

	const num = Math.round(0xffffff * parseInt(colorNum));
	const r = (num >> 16) & 255;
	const g = (num >> 8) & 255;
	const b = num & 255;

	return `rgb(${r}, ${g}, ${b}, ${opacity})`;
};
