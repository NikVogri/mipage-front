import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
	loading: boolean;
	error: any;
}

const initialState: AuthState = {
	loading: false,
	error: null,
};

const pageSlice = createSlice({
	name: "page",
	initialState,
	reducers: {},
});

// export const {} = pageSlice.actions;

// selects
// trunks

export default pageSlice.reducer;
