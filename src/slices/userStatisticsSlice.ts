import { createSlice } from "@reduxjs/toolkit";

interface UserStatisticsSlice {
    streak: number;
    vBucks: number;
    hearts: number;
    currentPeriodId: number;
    currentLessonId: number;
}

const initialState: UserStatisticsSlice = {
    streak: 0,
    vBucks: 0,
    hearts: 5,
    currentPeriodId: 0,
    currentLessonId: 1,
};

export const userStatisticsSlice = createSlice({
    name: "userStatistics",
    initialState,
    reducers: {
        setHearts: (state, action) => {
            state.hearts = action.payload.hearts;
        },

        giveHeart: (state) => {
            if (state.hearts < 5) {
                state.hearts += 1;
            }
        },
        takeHeart: (state) => {
            if (state.hearts > 0) {
                state.hearts -= 1;
            }
        },

        giveVBucks: (state, action) => {
            if (action.payload.vBucks > 0) {
                state.vBucks += action.payload.vBucks;
            }
        },

        takeVBucks: (state, action) => {
            if (state.vBucks >= action.payload.vBucks) {
                state.vBucks -= action.payload.vBucks;
            }
        },

        setCurrentPeriodId: (state, action) => {
            state.currentPeriodId = action.payload.currentPeriodId;
        },

        setCurrentLessonId: (state, action) => {
            state.currentLessonId = action.payload.currentLessonId;
        },
    },

    selectors: {
        selectHearts: (x) => x.hearts,
        selectVBucks: (x) => x.vBucks,
        selectCurrentPeriodId: (x) => x.currentPeriodId,
        selectCurrentLessonId: (x) => x.currentLessonId,
    },
});

export const { setHearts, giveHeart, takeHeart, giveVBucks, takeVBucks, setCurrentPeriodId, setCurrentLessonId } =
    userStatisticsSlice.actions;
export const { selectHearts, selectVBucks, selectCurrentPeriodId, selectCurrentLessonId } =
    userStatisticsSlice.selectors;

export default userStatisticsSlice.reducer;
