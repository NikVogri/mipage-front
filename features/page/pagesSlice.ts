import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { Page, PageType } from "models";
import { AppThunk, RootState } from "store";
import { createPage, fetchPages } from "features/page/pagesApi";

export interface AuthState {
	loading: boolean;
	pages: Page[];
	error: any;
}

const initialState: AuthState = {
	loading: false,
	pages: [],
	error: null,
};

// async trunks

export const createNewPage = createAsyncThunk(
	"/page/createNewPage",
	async (page: { title: string; type: PageType; isPrivate: boolean }, thunkAPI) => {
		try {
			const { auth } = thunkAPI.getState() as any;
			return await createPage(auth.token, page);
		} catch (err: any) {
			return thunkAPI.rejectWithValue(
				err?.response?.data?.message || "Something went wrong, please try again later."
			);
		}
	}
);

const pageSlice = createSlice({
	name: "page",
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setPages: (state, action: PayloadAction<Page[]>) => {
			state.pages = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(isPending(), (state) => {
			state.loading = true;
		});

		builder.addMatcher(isFulfilled(), (state) => {
			state.loading = false;
			state.error = null;
		});

		builder.addMatcher(isRejected(), (state, { payload }) => {
			console.log("here");
			state.error = payload as string;
			state.loading = false;
		});
	},
});

export const { setLoading, setPages } = pageSlice.actions;

// selects
export const selectPages = (state: RootState) => state.page.pages;

// trunks
export const getUserPages = (): AppThunk => async (dispatch, getState) => {
	const token = localStorage.getItem("token");

	dispatch(setLoading(true));
	const pages = await fetchPages(token!);
	dispatch(setLoading(false));

	if (pages) {
		dispatch(setPages(pages));
	}
};

export default pageSlice.reducer;
