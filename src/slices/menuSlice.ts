import { createSlice } from "@reduxjs/toolkit";

interface MenuSlice {
    selectedPage: number;
    isNavbarHidden: boolean;
    isSidebarHidden: boolean;
    isInsightCardHidden: boolean;
    isLeaderboardCardHidden: boolean;
    isDailyQuestCardHidden: boolean;
    isAdBlockerCardHidden: boolean;
    firstLevelStatus: number;
    chestStatus: number;
    secondLevelStatus: number;
    firstQuestInfo: number;
    secondQuestInfo: number;
    thirdQuestInfo: number;
}

const initialState: MenuSlice = {
    selectedPage: 0,
    isNavbarHidden: false,
    isSidebarHidden: false,
    isInsightCardHidden: false,
    isLeaderboardCardHidden: false,
    isDailyQuestCardHidden: false,
    isAdBlockerCardHidden: false,
    firstLevelStatus: 1,
    chestStatus: 0,
    secondLevelStatus: 0,
    firstQuestInfo: 0,
    secondQuestInfo: 0,
    thirdQuestInfo: 0,
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

        hideInsightCard: (state) => {
            state.isInsightCardHidden = true;
        },

        showInsightCard: (state) => {
            state.isInsightCardHidden = false;
        },

        hideLeaderboardCard: (state) => {
            state.isLeaderboardCardHidden = true;
        },

        showLeaderboardCard: (state) => {
            state.isLeaderboardCardHidden = false;
        },

        hideDailyQuestCard: (state) => {
            state.isDailyQuestCardHidden = true;
        },

        showDailyQuestCard: (state) => {
            state.isDailyQuestCardHidden = false;
        },

        hideAdBlockerCard: (state) => {
            state.isAdBlockerCardHidden = true;
        },

        showAdBlockerCard: (state) => {
            state.isAdBlockerCardHidden = false;
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

        setFirstQuestInfo: (state, action) => {
            state.firstQuestInfo = action.payload.firstAchievementInfo;
        },

        setSecondQuestInfo: (state, action) => {
            state.secondQuestInfo = action.payload.secondAchievementInfo;
        },

        setThirdQuestInfo: (state, action) => {
            state.thirdQuestInfo = action.payload.thirdAchievementInfo;
        },
    },
    selectors: {
        selectSelectedPage: (x) => x.selectedPage,
        selectIsNavbarHidden: (x) => x.isNavbarHidden,
        selectIsSidebarHidden: (x) => x.isSidebarHidden,
        selectIsInsightCardHidden: (x) => x.isInsightCardHidden,
        selectIsLeaderboardCardHidden: (x) => x.isLeaderboardCardHidden,
        selectIsDailyQuestCardHidden: (x) => x.isDailyQuestCardHidden,
        selectIsAdBlockerCardHidden: (x) => x.isAdBlockerCardHidden,
        selectFirstLevelStatus: (x) => x.firstLevelStatus,
        selectChestStatus: (x) => x.chestStatus,
        selectSecondLevelStatus: (x) => x.secondLevelStatus,
        selectFirstQuestInfo: (x) => x.firstQuestInfo,
        selectSecondQuestInfo: (x) => x.secondQuestInfo,
        selectThirdQuestInfo: (x) => x.thirdQuestInfo,
    },
});

export const {
    setPage,
    hideNavbar,
    showNavbar,
    hideSidebar,
    showSidebar,
    hideInsightCard,
    showInsightCard,
    hideLeaderboardCard,
    showLeaderboardCard,
    hideDailyQuestCard,
    showDailyQuestCard,
    hideAdBlockerCard,
    showAdBlockerCard,
    setFirstLevelStatus,
    setChestStatus,
    setSecondLevelStatus,
    setFirstQuestInfo,
    setSecondQuestInfo,
    setThirdQuestInfo,
} = menuSlice.actions;

export const {
    selectSelectedPage,
    selectIsNavbarHidden,
    selectIsSidebarHidden,
    selectIsInsightCardHidden,
    selectIsLeaderboardCardHidden,
    selectIsDailyQuestCardHidden,
    selectIsAdBlockerCardHidden,
    selectFirstLevelStatus,
    selectChestStatus,
    selectSecondLevelStatus,
    selectFirstQuestInfo,
    selectSecondQuestInfo,
    selectThirdQuestInfo,
} = menuSlice.selectors;

export default menuSlice.reducer;
