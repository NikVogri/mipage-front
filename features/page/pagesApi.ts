import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Page } from "models";

export const pageApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BE_BASE_URL }),
	reducerPath: "pageApi",
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
			async onQueryStarted({}, { dispatch, queryFulfilled }) {
				try {
					const { data: createdPage } = await queryFulfilled;
					dispatch(
						pageApi.util.updateQueryData("getUserPages", "", (pages) => {
							pages.unshift(createdPage);
						})
					);
				} catch {}
			},
		}),
	}),
});

export const { useGetUserPagesQuery, useCreatePageMutation } = pageApi;
