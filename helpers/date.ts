export const getMonthName = (index: number) => {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	return months[index];
};

/**
 * Returns formatted date string
 * Example: January 15, 2020
 */
export const formatToBasicDate = (date: Date, withYear?: boolean) => {
	const day = date.getDate();
	const month = getMonthName(date.getMonth());

	let output = `${month} ${day}`;

	if (withYear) {
		const year = date.getFullYear();
		output += `, ${year}`;
	}

	return output;
};
