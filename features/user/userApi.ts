import baseApi from "features/baseApi";

import { SearchedUser } from "models";

export const userExtendedApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUsers: build.query<SearchedUser[], { token: string; query: string }>({
			query: ({ token, query }) => ({
				url: `users/find?q=${query}`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),
	}),
});

export const { useLazyGetUsersQuery } = userExtendedApi;
