import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// TODO: limit credentials to "same-origin" when in prod
export const baseApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BE_BASE_URL, credentials: "include" }),
	endpoints: () => ({}),
	tagTypes: ["SidebarPages", "UserPages", "Page"],
});

export default baseApi;
