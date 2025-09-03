import { createSlice } from "@reduxjs/toolkit";

interface MenuSlice {
    selectedPage: number;
    isNavbarHidden: boolean;
    isSidebarHidden: boolean;
}

const initialState: MenuSlice = {
    selectedPage: 0,
    isNavbarHidden: false,
    isSidebarHidden: false,
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.selectedPage = action.payload.selectedPage;
        },

        hideNavbar: (state) => {
            state.isNavbarHidden = true;
        },

        showNavbar: (state) => {
            state.isNavbarHidden = false;
        },

        hideSidebar: (state) => {
            state.isSidebarHidden = true;
        },

        showSidebar: (state) => {
            state.isSidebarHidden = false;
        },
    },
    selectors: {
        selectSelectedPage: (x) => x.selectedPage,
        selectIsNavbarHidden: (x) => x.isNavbarHidden,
        selectIsSidebarHidden: (x) => x.isSidebarHidden,
    },
});

export const { setPage, hideNavbar, showNavbar, hideSidebar, showSidebar } = menuSlice.actions;

export const { selectSelectedPage, selectIsNavbarHidden, selectIsSidebarHidden } = menuSlice.selectors;

export default menuSlice.reducer;
