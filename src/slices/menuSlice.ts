import { createSlice } from "@reduxjs/toolkit";

interface MenuSlice {
    selectedPage: number;
    isNavbarHidden: boolean;
    isSidebarHidden: boolean;
    isStatisticCardHidden: boolean;
    isInsightCardHidden: boolean;
    isLeaderboardCardHidden: boolean;
    isDailyQuestCardHidden: boolean;
    isAdBlockerCardHidden: boolean;
    isWhatAreLeaderboardsCardHidden: boolean;
    isInfoCardHidden: boolean;
    isMonthlyBadgesCardHidden: boolean;
    unitLoaded: number;
    firstLevelStatus: number;
    chestStatus: number;
    secondLevelStatus: number;
    firstQuestInfo: number;
    secondQuestInfo: number;
    thirdQuestInfo: number;
    isLessonTopBottomRowsHidden: boolean;
}

const initialState: MenuSlice = {
    selectedPage: 0,
    isNavbarHidden: false,
    isSidebarHidden: false,
    isStatisticCardHidden: false,
    isInsightCardHidden: false,
    isLeaderboardCardHidden: false,
    isDailyQuestCardHidden: false,
    isAdBlockerCardHidden: false,
    isWhatAreLeaderboardsCardHidden: false,
    isInfoCardHidden: false,
    isMonthlyBadgesCardHidden: false,
    unitLoaded: 0,
    firstLevelStatus: 1,
    chestStatus: 0,
    secondLevelStatus: 0,
    firstQuestInfo: 0,
    secondQuestInfo: 0,
    thirdQuestInfo: 0,
    isLessonTopBottomRowsHidden: false,
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

        addUnitLoaded: (state) => {
            state.unitLoaded += 1;
        },

        resetUnitLoaded: (state) => {
            state.unitLoaded = 0;
        },

        hideSidebar: (state) => {
            state.isSidebarHidden = true;
        },

        showSidebar: (state) => {
            state.isSidebarHidden = false;
        },

        hideStatisticCard: (state) => {
            state.isStatisticCardHidden = true;
        },

        showStatisticCard: (state) => {
            state.isStatisticCardHidden = false;
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

        hideWhatAreLeaderboardsCard: (state) => {
            state.isWhatAreLeaderboardsCardHidden = true;
        },

        showWhatAreLeaderboardsCard: (state) => {
            state.isWhatAreLeaderboardsCardHidden = false;
        },

        hideInfoCard: (state) => {
            state.isInfoCardHidden = true;
        },

        showInfoCard: (state) => {
            state.isInfoCardHidden = false;
        },

        hideMonthlyBadgesCard: (state) => {
            state.isMonthlyBadgesCardHidden = true;
        },

        showMonthlyBadgesCard: (state) => {
            state.isMonthlyBadgesCardHidden = false;
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
            state.firstQuestInfo = action.payload.firstQuestInfo;
        },

        setSecondQuestInfo: (state, action) => {
            state.secondQuestInfo = action.payload.secondQuestInfo;
        },

        setThirdQuestInfo: (state, action) => {
            state.thirdQuestInfo = action.payload.thirdQuestInfo;
        },

        hideLessonTopBottomRows: (state) => {
            state.isLessonTopBottomRowsHidden = false;
        },

        showLessonTopBottomRows: (state) => {
            state.isLessonTopBottomRowsHidden = true;
        },
    },
    selectors: {
        selectSelectedPage: (x) => x.selectedPage,
        selectIsNavbarHidden: (x) => x.isNavbarHidden,
        selectIsSidebarHidden: (x) => x.isSidebarHidden,
        selectIsStatisticCardHidden: (x) => x.isStatisticCardHidden,
        selectIsInsightCardHidden: (x) => x.isInsightCardHidden,
        selectIsLeaderboardCardHidden: (x) => x.isLeaderboardCardHidden,
        selectIsDailyQuestCardHidden: (x) => x.isDailyQuestCardHidden,
        selectIsAdBlockerCardHidden: (x) => x.isAdBlockerCardHidden,
        selectIsWhatAreLeaderboardsCardHidden: (x) => x.isWhatAreLeaderboardsCardHidden,
        selectIsInfoCardHidden: (x) => x.isInfoCardHidden,
        selectIsMonthlyBadgesCardHidden: (x) => x.isMonthlyBadgesCardHidden,
        selectUnitLoaded: (x) => x.unitLoaded,
        selectFirstLevelStatus: (x) => x.firstLevelStatus,
        selectChestStatus: (x) => x.chestStatus,
        selectSecondLevelStatus: (x) => x.secondLevelStatus,
        selectFirstQuestInfo: (x) => x.firstQuestInfo,
        selectSecondQuestInfo: (x) => x.secondQuestInfo,
        selectThirdQuestInfo: (x) => x.thirdQuestInfo,
        selectIsLessonTopBottomRowsHidden: (x) => x.isLessonTopBottomRowsHidden,
    },
});

export const {
    setPage,
    hideNavbar,
    showNavbar,
    hideSidebar,
    showSidebar,
    hideStatisticCard,
    showStatisticCard,
    hideInsightCard,
    showInsightCard,
    hideLeaderboardCard,
    showLeaderboardCard,
    hideDailyQuestCard,
    showDailyQuestCard,
    hideAdBlockerCard,
    showAdBlockerCard,
    hideWhatAreLeaderboardsCard,
    showWhatAreLeaderboardsCard,
    hideInfoCard,
    showInfoCard,
    hideMonthlyBadgesCard,
    showMonthlyBadgesCard,
    addUnitLoaded,
    resetUnitLoaded,
    setFirstLevelStatus,
    setChestStatus,
    setSecondLevelStatus,
    setFirstQuestInfo,
    setSecondQuestInfo,
    setThirdQuestInfo,
    hideLessonTopBottomRows,
    showLessonTopBottomRows,
} = menuSlice.actions;

export const {
    selectSelectedPage,
    selectIsNavbarHidden,
    selectIsSidebarHidden,
    selectIsStatisticCardHidden,
    selectIsInsightCardHidden,
    selectIsLeaderboardCardHidden,
    selectIsDailyQuestCardHidden,
    selectIsAdBlockerCardHidden,
    selectIsWhatAreLeaderboardsCardHidden,
    selectIsInfoCardHidden,
    selectIsMonthlyBadgesCardHidden,
    selectUnitLoaded,
    selectFirstLevelStatus,
    selectChestStatus,
    selectSecondLevelStatus,
    selectFirstQuestInfo,
    selectSecondQuestInfo,
    selectThirdQuestInfo,
    selectIsLessonTopBottomRowsHidden,
} = menuSlice.selectors;

export default menuSlice.reducer;
