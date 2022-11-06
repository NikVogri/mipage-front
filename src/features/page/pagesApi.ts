import baseApi from "features/baseApi";

import { Page, PageType, SidebarPage } from "models";

export const pageExtendedApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUserPages: build.query<Page[], null>({
			query: () => {
				return {
					url: "pages",
				};
			},
			providesTags: ["UserPages"],
		}),
		getSinglePage: build.query<Page, { pageId: string }>({
			query: ({ pageId }) => ({
				url: `pages/${pageId}`,
			}),
			providesTags: ["Page"],
		}),
		getSinglePublicPage: build.query<Page, { pageId: string }>({
			query: ({ pageId }) => ({
				url: `pages/${pageId}/public`,
			}),
		}),
		getSidebarPages: build.query<SidebarPage[], null>({
			query: () => ({
				url: `pages/minimal`,
			}),
			providesTags: ["SidebarPages"],
		}),
		createPage: build.mutation<Page, { title: string; type: PageType; isPrivate: boolean }>({
			query: ({ title, type, isPrivate }) => {
				return {
					url: "pages",
					body: { title, type, isPrivate },
					method: "POST",
				};
			},
			invalidatesTags: ["UserPages", "SidebarPages"],
		}),
		updatePage: build.mutation<Page, { pageId: string; title: string; isPrivate: boolean }>({
			query: ({ pageId, title, isPrivate }) => {
				return {
					url: `pages/${pageId}`,
					body: { title, isPrivate },
					method: "PATCH",
				};
			},
			invalidatesTags: ["UserPages", "SidebarPages", "Page"],
		}),
		deletePage: build.mutation<Page, { pageId: string }>({
			query: ({ pageId }) => {
				return {
					url: `pages/${pageId}`,
					method: "DELETE",
				};
			},
			invalidatesTags: ["UserPages", "SidebarPages"],
		}),
	}),
});

export const {
	useGetUserPagesQuery,
	useCreatePageMutation,
	useGetSinglePageQuery,
	useLazyGetSinglePageQuery,
	useLazyGetSinglePublicPageQuery,
	useGetSinglePublicPageQuery,
	useGetSidebarPagesQuery,
	useUpdatePageMutation,
	useDeletePageMutation,
} = pageExtendedApi;
