export const logPageViewToGTag = (url: string) => {
	(window as any).gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
		page_path: url,
	});
};

export const logEventToGTag = ({ action, params }: { action: string; params: any }) => {
	(window as any).gtag("event", action, params);
};
