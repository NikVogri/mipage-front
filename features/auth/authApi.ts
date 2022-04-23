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
		resetPassword: build.mutation<null, { password: string; token: string }>({
			query: ({ password, token }) => ({
				url: `auth/reset-password`,
				method: "POST",
				body: { password, token },
			}),
		}),
	}),
});

export const { useForgotPasswordMutation, useResetPasswordMutation } = authExtendedApi;
