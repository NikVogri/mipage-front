import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

export interface AuthState {
	needsSync: boolean;
}

const initialState: AuthState = {
	needsSync: false,
};

const pageSlice = createSlice({
	name: "page",
	initialState,
	reducers: {
		setNeedsSync: (state, { payload }: { payload: boolean }) => {
			state.needsSync = payload;
		},
	},
});

export const { setNeedsSync } = pageSlice.actions;

// selects
export const selectNeedsSync = (state: RootState) => state.page.needsSync;
// trunks

export default pageSlice.reducer;
