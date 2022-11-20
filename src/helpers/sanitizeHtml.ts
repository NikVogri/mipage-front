export const SAFE_HTML_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6", "ol", "ul", "li", "strong", "u", "i", "code", "br"];

import DOMPurify from "dompurify";

export const sanitizeHtml = (str: string) => {
	return DOMPurify.sanitize(str, {
		ALLOWED_TAGS: SAFE_HTML_TAGS,
	});
};
