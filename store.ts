import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "features/auth/authSlice";
import { pageApi } from "features/page/pagesApi";
import pagesSlice from "features/page/pagesSlice";

export const store = configureStore({
	reducer: {
		auth: authSlice,
		page: pagesSlice,
		[pageApi.reducerPath]: pageApi.reducer,
	},

	middleware: (gDM) => gDM().concat(pageApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
