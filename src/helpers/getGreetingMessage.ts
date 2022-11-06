export const getGreetingMessage = () => {
	const currentTime = new Date();
	if (currentTime.getHours() < 12) {
		return "Good morning";
	} else if (currentTime.getHours() < 17) {
		return "Good afternoon";
	} else {
		return "Good evening";
	}
};
