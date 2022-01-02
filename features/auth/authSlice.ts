import {
	createAsyncThunk,
	createSlice,
	isAnyOf,
	isFulfilled,
	isPending,
	isRejected,
	PayloadAction,
} from "@reduxjs/toolkit";
import { User } from "models";
import { AppThunk, RootState } from "store";
import { fetchMe, postLogin, postSignup } from "features/auth/authApi";

export interface AuthState {
	isAuth: boolean;
	id: string;
	username: string;
	avatar: string | null;
	error: string | null;
	loading: boolean;
	token: string | null;
}

const initialState: AuthState = {
	isAuth: false,
	id: "",
	username: "",
	avatar: null,
	error: null,
	token: null,
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
			const token = await postLogin(loginData);
			localStorage.setItem("token", token);
		} catch (err: any) {
			return thunkAPI.rejectWithValue(
				err?.response?.data?.message || "Something went wrong, please try again later."
			);
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},

		setUser: (state, action: PayloadAction<User>) => {
			const payload = action.payload;
			const { id, username, avatar } = payload;

			state.isAuth = true;
			state.id = id;
			state.username = username;
			state.avatar = avatar;
		},

		setToken(state, action: PayloadAction<string>) {
			state.token = action.payload;
		},

		clearUser: (state) => {
			state.isAuth = false;
			state.id = "";
			state.username = "";
			state.avatar = null;
		},

		setAuthError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},

		clearAuthError: (state) => {
			state.error = null;
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

export const { setUser, clearUser, setLoading, setAuthError, clearAuthError, setToken } = authSlice.actions;

// selects
export const selectAuth = (state: RootState) => state.auth;
export const selectAuthError = (state: RootState) => state.auth.error;

// trunks
export const getMe =
	(jwt: string): AppThunk =>
	async (dispatch) => {
		dispatch(setLoading(true));
		const user = await fetchMe(jwt);
		dispatch(setLoading(false));

		if (user) {
			dispatch(setUser(user));
			dispatch(setToken(jwt));
		} else {
			dispatch(clearUser());
		}
	};

export default authSlice.reducer;
