import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BE_BASE_URL }),
	endpoints: () => ({}),
	tagTypes: ["SidebarPages", "UserPages"],
});

export default baseApi;
