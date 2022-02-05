import baseApi from "features/baseApi";
import { pageExtendedApi } from "features/page/pagesApi";

import { PageMember } from "models";

export const membersExtendedApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		addMemberToPage: build.mutation<PageMember[], { token: string; pageId: string; email: string }>({
			query: ({ token, pageId, email }) => ({
				url: `/pages/${pageId}/members`,
				method: "POST",
				body: { email },
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			async onQueryStarted({ token, pageId }, { dispatch, queryFulfilled }) {
				try {
					const { data: updatedMembers } = await queryFulfilled;

					dispatch(
						pageExtendedApi.util.updateQueryData("getSinglePage", { token, pageId }, (page) => {
							page.members = updatedMembers;
						})
					);
				} catch {}
			},
		}),
		removeMemberFromPage: build.mutation<PageMember[], { token: string; pageId: string; id: string }>({
			query: ({ token, pageId, id: memberId }) => ({
				url: `/pages/${pageId}/members/${memberId}`,
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			async onQueryStarted({ token, pageId }, { dispatch, queryFulfilled }) {
				try {
					const { data: updatedMembers } = await queryFulfilled;

					dispatch(
						pageExtendedApi.util.updateQueryData("getSinglePage", { token, pageId }, (page) => {
							page.members = updatedMembers;
						})
					);
				} catch {}
			},
		}),
	}),
});

export const { useAddMemberToPageMutation, useRemoveMemberFromPageMutation } = membersExtendedApi;
