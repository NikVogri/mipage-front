import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import pagesSlice from "features/page/pagesSlice";
import authSlice from "features/auth/authSlice";

import { pageApi } from "features/page/pagesApi";
import { todoApi } from "features/todo/todoApi";
import { notebookApi } from "features/notebook/notebookApi";

export const store = configureStore({
	reducer: {
		auth: authSlice,
		page: pagesSlice,
		[pageApi.reducerPath]: pageApi.reducer,
		[todoApi.reducerPath]: todoApi.reducer,
		[notebookApi.reducerPath]: notebookApi.reducer,
	},

	middleware: (gDM) => gDM().concat([pageApi.middleware, todoApi.middleware, notebookApi.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
