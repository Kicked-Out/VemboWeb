import { createSlice } from "@reduxjs/toolkit";

interface MenuSlice {
    selectedPage: number;
    isNavbarHidden: boolean;
    isSidebarHidden: boolean;
    firstLevelStatus: number;
    chestStatus: number;
    secondLevelStatus: number;
    firstAchievementInfo: number;
    secondAchievementInfo: number;
    thirdAchievementInfo: number;
}

const initialState: MenuSlice = {
    selectedPage: 0,
    isNavbarHidden: false,
    isSidebarHidden: false,
    firstLevelStatus: 1,
    chestStatus: 0,
    secondLevelStatus: 0,
    firstAchievementInfo: 0,
    secondAchievementInfo: 0,
    thirdAchievementInfo: 0,
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

        setFirstLevelStatus: (state, action) => {
            state.firstLevelStatus = action.payload.firstLevelStatus;
        },

        setChestStatus: (state, action) => {
            state.chestStatus = action.payload.chestStatus;
        },

        setSecondLevelStatus: (state, action) => {
            state.secondLevelStatus = action.payload.secondLevelStatus;
        },

        setFirstAchievementInfo: (state, action) => {
            state.firstAchievementInfo = action.payload.firstAchievementInfo;
        },

        setSecondAchievementInfo: (state, action) => {
            state.secondAchievementInfo = action.payload.secondAchievementInfo;
        },

        setThirdAchievementInfo: (state, action) => {
            state.thirdAchievementInfo = action.payload.thirdAchievementInfo;
        },
    },
    selectors: {
        selectSelectedPage: (x) => x.selectedPage,
        selectIsNavbarHidden: (x) => x.isNavbarHidden,
        selectIsSidebarHidden: (x) => x.isSidebarHidden,
        selectFirstLevelStatus: (x) => x.firstLevelStatus,
        selectChestStatus: (x) => x.chestStatus,
        selectSecondLevelStatus: (x) => x.secondLevelStatus,
        selectFirstAchievementInfo: (x) => x.firstAchievementInfo,
        selectSecondAchievementInfo: (x) => x.secondAchievementInfo,
        selectThirdAchievementInfo: (x) => x.thirdAchievementInfo,
    },
});

export const {
    setPage,
    hideNavbar,
    showNavbar,
    hideSidebar,
    showSidebar,
    setFirstLevelStatus,
    setChestStatus,
    setSecondLevelStatus,
    setFirstAchievementInfo,
    setSecondAchievementInfo,
    setThirdAchievementInfo,
} = menuSlice.actions;

export const {
    selectSelectedPage,
    selectIsNavbarHidden,
    selectIsSidebarHidden,
    selectFirstLevelStatus,
    selectChestStatus,
    selectSecondLevelStatus,
    selectFirstAchievementInfo,
    selectSecondAchievementInfo,
    selectThirdAchievementInfo,
} = menuSlice.selectors;

export default menuSlice.reducer;
