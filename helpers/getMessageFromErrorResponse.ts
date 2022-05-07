import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export const getMessageFromErrorResponse = (response: FetchBaseQueryError | SerializedError | undefined): string => {
	// TODO: fix types
	const message = (response as any)?.data?.message;
	const statusCode = (response as any)?.status;

	if (!message || statusCode === 500) return "An unknown error occured, please try again later";

	return message;
};
