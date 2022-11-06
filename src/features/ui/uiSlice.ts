import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

export interface AuthState {
	isMobileView: boolean;
	pageSidebarIsOpen: boolean;
}

const initialState: AuthState = {
	isMobileView: false,
	pageSidebarIsOpen: true,
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		togglePageSidebar(state) {
			state.pageSidebarIsOpen = !state.pageSidebarIsOpen;
		},

		setIsMobileView(state, action) {
			state.isMobileView = action.payload;
		},
	},
});

export const { togglePageSidebar, setIsMobileView } = uiSlice.actions;

// selects
export const pageSidebarIsOpen = (state: RootState) => state.ui.pageSidebarIsOpen;
export const isMobileView = (state: RootState) => state.ui.isMobileView;

export default uiSlice.reducer;
