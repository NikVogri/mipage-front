import baseApi from "features/baseApi";

import { Page, SidebarPage } from "models";

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
		}),
		getSidebarPages: build.query<SidebarPage[], null>({
			query: () => ({
				url: `pages/minimal`,
			}),
			providesTags: ["SidebarPages"],
		}),
		createPage: build.mutation<Page, { pageData: Partial<Page> }>({
			query: ({ pageData }) => {
				return {
					url: "pages",
					body: pageData,
					method: "POST",
				};
			},
			invalidatesTags: ["UserPages", "SidebarPages"],
		}),
	}),
});

export const { useGetUserPagesQuery, useCreatePageMutation, useGetSinglePageQuery, useGetSidebarPagesQuery } =
	pageExtendedApi;
