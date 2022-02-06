import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { User } from "models";
import { RootState } from "store";
import { fetchMe, postLogin, postSignup } from "features/auth/authApi";

export interface AuthState {
	isAuth: boolean;
	user: User | null;
	checked: boolean;
	errorMessage: string;
	loading: boolean;
}

const initialState: AuthState = {
	isAuth: false,
	checked: false,
	user: null,
	errorMessage: "",
	loading: false,
};

// async trunks
export const signup = createAsyncThunk(
	"/auth/signup",
	async (signupData: { email: string; username: string; password: string }, thunkAPI) => {
		try {
			await postSignup(signupData);
		} catch (err: any) {
			return thunkAPI.rejectWithValue(
				err?.response?.data?.message || "Something went wrong, please try again later."
			);
		}
	}
);

export const login = createAsyncThunk(
	"/auth/login",
	async (loginData: { email: string; password: string }, thunkAPI) => {
		try {
			await postLogin(loginData);
			await thunkAPI.dispatch(getMe());
		} catch (err: any) {
			return thunkAPI.rejectWithValue(
				err?.response?.data?.message || "Something went wrong, please try again later."
			);
		}
	}
);

export const getMe = createAsyncThunk("/user/me", async ({}, thunkAPI) => {
	try {
		const user = await fetchMe();

		if (user) {
			thunkAPI.dispatch(setUser(user));
		}
	} catch (err: any) {
		return thunkAPI.rejectWithValue(
			err?.response?.data?.message || "Something went wrong, please try again later."
		);
	}
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			const payload = action.payload;
			const { id, username, avatar, createdAt, email, updatedAt } = payload;

			state.isAuth = true;
			state.checked = true;
			state.user = { id, username, avatar, email, createdAt, updatedAt };
		},

		clearUser: (state) => {
			state.isAuth = false;
			state.user = null;
		},

		setAuthChecked: (state) => {
			state.checked = true;
		},

		setAuthError: (state, action: PayloadAction<string>) => {
			state.errorMessage = action.payload;
		},

		clearAuthError: (state) => {
			state.errorMessage = "";
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(isPending(), (state) => {
			state.loading = true;
		});

		builder.addMatcher(isFulfilled(), (state) => {
			state.loading = false;
			state.errorMessage = "";
		});

		builder.addMatcher(isRejected(), (state, { payload }) => {
			state.errorMessage = payload as string;
			state.loading = false;
		});
	},
});

export const { setUser, clearUser, setAuthChecked, clearAuthError } = authSlice.actions;

// selects
export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthChecked = (state: RootState) => state.auth.checked;

export const selectErrorMessage = (state: RootState) => state.auth.errorMessage;
export const selectLoading = (state: RootState) => state.auth.loading;

export default authSlice.reducer;
