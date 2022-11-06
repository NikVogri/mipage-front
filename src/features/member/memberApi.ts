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
				} catch {}
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
				} catch {
					toast.error(`We weren't able to remove the selected member. Please try again or contact support.`);
				}
			},
		}),
		leavePage: build.mutation<PageMember[], { pageId: string }>({
			query: ({ pageId }) => ({
				url: `/pages/${pageId}/members`,
				method: "DELETE",
			}),
			invalidatesTags: ["SidebarPages"],
			async onQueryStarted({}, { queryFulfilled }) {
				try {
					await queryFulfilled;
					toast.success(`You have left the page`);
				} catch {
					toast.error(`We weren't able to remove you from the page. Please try again or contact support.`);
				}
			},
		}),
	}),
});

export const { useAddMemberToPageMutation, useRemoveMemberFromPageMutation, useLeavePageMutation } = membersExtendedApi;
