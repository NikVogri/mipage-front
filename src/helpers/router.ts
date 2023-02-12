// NextJS router by default transforms an (undefined) query param value to an empty string (''). This behaviour
// is not always welcome and instead the removal of that param fits the occasion better. This function handles the case.
export const parseQueryParams = (params: Record<string, string | undefined>): Record<string, string> => {
	const parsedParams: Record<string, string> = {};

	for (const [k, v] of Object.entries(params)) {
		if (typeof v !== "undefined") {
			parsedParams[k] = v;
		}
	}

	return parsedParams;
};
