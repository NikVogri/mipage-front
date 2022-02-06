import baseApi from "features/baseApi";
import { Notification } from "models";

export const notificationsExtendedApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getNotifications: build.query<Notification[], null>({
			query: () => ({
				url: `/notifications`,
			}),
		}),
		markNotificationCompleted: build.mutation<Notification, { id: string }>({
			query: ({ id }) => ({
				url: `notifications/${id}`,
				method: "PATCH",
			}),
			async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(
						notificationsExtendedApi.util.updateQueryData("getNotifications", null, (notifications) => {
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
