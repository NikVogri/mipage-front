import baseApi from "features/baseApi";

export const authExtendedApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		forgotPassword: build.mutation<null, { email: string }>({
			query: ({ email }) => ({
				url: `auth/forgot-password`,
				method: "POST",
				body: { email },
			}),
		}),
	}),
});

export const { useForgotPasswordMutation } = authExtendedApi;
