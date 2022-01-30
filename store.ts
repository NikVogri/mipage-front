import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import pagesSlice from "features/page/pagesSlice";
import authSlice from "features/auth/authSlice";

import baseApi from "features/baseApi";

export const store = configureStore({
	reducer: {
		auth: authSlice,
		page: pagesSlice,
		[baseApi.reducerPath]: baseApi.reducer,
	},

	middleware: (gDM) => gDM().concat([baseApi.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
