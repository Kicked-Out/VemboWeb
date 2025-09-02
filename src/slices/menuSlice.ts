import { createSlice } from "@reduxjs/toolkit";

interface MenuSlice {
    selectedPage: number;
}

const initialState: MenuSlice = {
    selectedPage: 0,
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.selectedPage = action.payload.selectedPage;
        },
    },
    selectors: {
        selectSelectedPage: (x) => x.selectedPage,
    },
});

export const { setPage } = menuSlice.actions;

export const { selectSelectedPage } = menuSlice.selectors;

export default menuSlice.reducer;
