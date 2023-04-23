import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { PersonalInfoPayload, User } from "models";
import { RootState } from "store";
import { fetchMe, postLogin, postLogout, postSignup, postPersonalInfo, deleteUser } from "features/auth/authEndpoints";
import { toast } from "react-toastify";

export interface AuthState {
	isAuth: boolean;
	user: User | null;
}

const initialState: AuthState = {
	isAuth: false,
	user: null,
};

// async trunks

export const getMeAndUpdateState = createAsyncThunk("/user/me", async ({}, { dispatch, rejectWithValue }) => {
	try {
		const user = await fetchMe();

		if (user) {
			dispatch(setUser(user));
		}
	} catch (err: any) {
		return rejectWithValue(
			err?.response?.data?.message ||
				"We weren't able to fetch your account information, please try refreshing the page."
		);
	}
});

export const initAuth = createAsyncThunk("/auth/signup", async (_, { dispatch }) => {
	try {
		await dispatch(getMeAndUpdateState());
	} catch (err: any) {}
});

export const signup = createAsyncThunk(
	"/auth/signup",
	async (signupData: { email: string; username: string; password: string }, thunkAPI) => {
		try {
			await postSignup(signupData);
			toast.success(`You have successfully registered. Log in now!`);
		} catch (err: any) {
			return thunkAPI.rejectWithValue(
				err?.response?.data?.message || "We weren't able to sign you up. Please try again or contact support."
			);
		}
	}
);

export const login = createAsyncThunk(
	"/auth/login",
	async (loginData: { email: string; password: string }, { dispatch, rejectWithValue }) => {
		try {
			await postLogin(loginData);
			await dispatch(getMeAndUpdateState());
		} catch (err: any) {
			return rejectWithValue(err?.response?.data?.message || "Something went wrong, please try again later.");
		}
	}
);

export const logout = createAsyncThunk("/auth/logout", async ({}, thunkAPI) => {
	try {
		await postLogout();
		thunkAPI.dispatch(clearUser());
	} catch (err: any) {
		return thunkAPI.rejectWithValue(
			err?.response?.data?.message || "Something went wrong, please try again later."
		);
	}
});

export const updatePersonalInfo = createAsyncThunk(
	"/users/me/personal-info",
	async (personalInfo: PersonalInfoPayload, thunkAPI) => {
		try {
			const res = await postPersonalInfo(personalInfo);
			thunkAPI.dispatch(updateUser(res));
			toast.success("Your personal information has been updated");
		} catch (err: any) {
			return thunkAPI.rejectWithValue(
				err?.response?.data?.message ||
					"We weren't able to update your personal information. Please try again or contact support."
			);
		}
	}
);

export const deleteUserAndLogout = createAsyncThunk("/users/me/personal-info", async ({}, thunkAPI) => {
	try {
		await deleteUser();
		thunkAPI.dispatch(clearUser());
	} catch (err: any) {
		return thunkAPI.rejectWithValue(
			err?.response?.data?.message || "We weren't able to delete your account, please try again later."
		);
	}
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			const payload = action.payload;
			const { id, username, avatar, createdAt, email, bio } = payload;

			state.isAuth = true;
			state.user = { id, username, avatar, email, createdAt, bio };
		},

		updateUser: (state, action: PayloadAction<PersonalInfoPayload>) => {
			if (!state.user) return;
			state.user = Object.assign(state.user, action.payload);
		},

		clearUser: (state) => {
			state.isAuth = false;
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(isRejected(), (state, { payload }) => {
			toast.error(payload as string);
		});
	},
});

export const { setUser, clearUser, updateUser } = authSlice.actions;

// selects
export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
