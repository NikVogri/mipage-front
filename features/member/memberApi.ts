import baseApi from "features/baseApi";
import { pageExtendedApi } from "features/page/pagesApi";
import { toast } from "react-toastify";
import { PageMember } from "models";

export const membersExtendedApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		addMemberToPage: build.mutation<PageMember[], { pageId: string; email: string }>({
			query: ({ pageId, email }) => ({
				url: `/pages/${pageId}/members`,
				method: "POST",
				body: { email },
			}),
			async onQueryStarted({ pageId }, { dispatch, queryFulfilled }) {
				try {
					const { data: updatedMembers } = await queryFulfilled;

					dispatch(
						pageExtendedApi.util.updateQueryData("getSinglePage", { pageId }, (page) => {
							page.members = updatedMembers;
						})
					);

					toast.success(`Successfully added user to your page`);
				} catch {
					toast.error(`Could not add user to this page`);
				}
			},
		}),
		removeMemberFromPage: build.mutation<PageMember[], { pageId: string; id: string }>({
			query: ({ pageId, id: memberId }) => ({
				url: `/pages/${pageId}/members/${memberId}`,
				method: "DELETE",
			}),
			async onQueryStarted({ pageId }, { dispatch, queryFulfilled }) {
				try {
					const { data: updatedMembers } = await queryFulfilled;

					dispatch(
						pageExtendedApi.util.updateQueryData("getSinglePage", { pageId }, (page) => {
							page.members = updatedMembers;
						})
					);

					toast.success(`Successfully removed user from your page`);
				} catch {
					toast.error(`Could not remove user from this page`);
				}
			},
		}),
	}),
});

export const { useAddMemberToPageMutation, useRemoveMemberFromPageMutation } = membersExtendedApi;
