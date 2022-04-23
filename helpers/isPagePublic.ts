import { PUBLIC_PATHS } from "config";

// TODO: make this check more robust
export const isPagePublic = (urlPath: string): boolean => {
	for (const publicPath of PUBLIC_PATHS) {
		if (urlPath.includes(publicPath)) {
			return true;
		}
	}

	return false;
};
