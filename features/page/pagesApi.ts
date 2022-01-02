import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "config/axios";
import { Page, PageType } from "models";

export const fetchPages = async (token: string) => {
	try {
		const res = await axios.get("/pages", { headers: { Authorization: `Bearer ${token}` } });
		return res.data;
	} catch (error) {}
};

export const createPage = async (token: string, page: { title: string; type: PageType; isPrivate: boolean }) => {
	const res = await axios.post("/pages", page, { headers: { Authorization: `Bearer ${token}` } });
	return res.data;
};

export const pageApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BE_BASE_URL }),
	reducerPath: "pageApi",
	endpoints: (build) => ({
		getUserPages: build.query<Page[], null>({
			query: () => {
				const token = localStorage.getItem("token");

				return {
					url: "pages",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
			},
		}),
		createPage: build.mutation<Page, Partial<Page>>({
			query: (pageData) => {
				const token = localStorage.getItem("token");

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
						pageApi.util.updateQueryData("getUserPages", null, (pages) => {
							pages.unshift(createdPage);
						})
					);
				} catch {}
			},
		}),
	}),
});

export const { useGetUserPagesQuery, useCreatePageMutation } = pageApi;
