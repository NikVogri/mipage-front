import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "features/auth/authSlice";
import { pageApi } from "features/page/pagesApi";
import pagesSlice from "features/page/pagesSlice";
import { todoApi } from "features/todo/todoApi";

export const store = configureStore({
	reducer: {
		auth: authSlice,
		page: pagesSlice,
		[pageApi.reducerPath]: pageApi.reducer,
		[todoApi.reducerPath]: todoApi.reducer,
	},

	middleware: (gDM) => gDM().concat(pageApi.middleware).concat(todoApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
