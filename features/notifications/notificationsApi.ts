import baseApi from "features/baseApi";
import { Notification } from "models";

export const notificationsExtendedApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getNotifications: build.query<Notification[], { token: string }>({
			query: ({ token }) => ({
				url: `/notifications`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),
		markNotificationCompleted: build.mutation<Notification, { id: string; token: string }>({
			query: ({ token, id }) => ({
				url: `notifications/${id}`,
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			async onQueryStarted({ token, id }, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(
						baseApi.util.updateQueryData("getNotifications", { token }, (notifications) => {
							const notification = notifications.find((n) => n.id === id);
							if (!notification) return;

							notification.viewed = true;
						})
					);
				} catch {}
			},
		}),
	}),
});

export const { useGetNotificationsQuery, useMarkNotificationCompletedMutation } = notificationsExtendedApi;
