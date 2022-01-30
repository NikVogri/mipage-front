import baseApi from "features/baseApi";

import { Page, SidebarPage } from "models";

export const pageExtendedApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUserPages: build.query<Page[], string>({
			query: (token) => {
				return {
					url: "pages",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
			},
			providesTags: ["UserPages"],
		}),
		getSinglePage: build.query<Page, { token: string; pageId: string }>({
			query: ({ token, pageId }) => ({
				url: `pages/${pageId}`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),
		getSidebarPages: build.query<SidebarPage[], string>({
			query: (token) => ({
				url: `pages/minimal`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			// providesTags: ["SidebarPages"],
		}),
		createPage: build.mutation<Page, { token: string; pageData: Partial<Page> }>({
			query: ({ pageData, token }) => {
				return {
					url: "pages",
					body: pageData,
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
			},
			invalidatesTags: ["UserPages", "SidebarPages"],
		}),
	}),
});

export const { useGetUserPagesQuery, useCreatePageMutation, useGetSinglePageQuery, useGetSidebarPagesQuery } =
	pageExtendedApi;
