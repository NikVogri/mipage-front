import baseApi from "features/baseApi";

import { SearchedUser } from "models";

export const userExtendedApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUsers: build.query<SearchedUser[], { query: string }>({
			query: ({ query }) => ({
				url: `users/find?q=${query}`,
			}),
		}),
	}),
});

export const { useLazyGetUsersQuery } = userExtendedApi;
