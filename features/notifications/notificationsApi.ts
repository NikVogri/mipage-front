import baseApi from "features/baseApi";

export const notificationsExtendedApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getNotifications: build.query<any, { token: string }>({
			query: ({ token }) => ({
				url: `/notifications`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),
	}),
});

export const { useGetNotificationsQuery } = notificationsExtendedApi;
