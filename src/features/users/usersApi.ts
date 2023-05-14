import baseApi from "features/baseApi";

import { UserCardProfile } from "models";

export const usersExtendedApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getProfile: build.query<UserCardProfile, { userId: string }>({
			query: ({ userId }) => ({ url: `/users/${userId}/profile` }),
		}),
	}),
});

export const { useGetProfileQuery } = usersExtendedApi;
