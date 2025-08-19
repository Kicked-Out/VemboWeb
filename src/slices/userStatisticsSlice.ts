import { createSlice } from "@reduxjs/toolkit";
import type { UserStatisticDTO } from "../DTOs/userStatisticDTO";

interface UserStatisticsSlice {
    streak: number;
    vBucks: number;
    hearts: number;
    currentPeriodId: number;
    currentLessonId: number;
}

const initialState: UserStatisticDTO = {
    id: 0,
    userId: "1",
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

        setStreak: (state, action) => {
            state.streak = action.payload.streak;
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
        selectStreak: (x) => x.streak,
        selectVBucks: (x) => x.vBucks,
        selectCurrentPeriodId: (x) => x.currentPeriodId,
        selectCurrentLessonId: (x) => x.currentLessonId,
    },
});

export const {
    setHearts,
    giveHeart,
    takeHeart,
    setStreak,
    giveVBucks,
    takeVBucks,
    setCurrentPeriodId,
    setCurrentLessonId,
} = userStatisticsSlice.actions;
export const { selectHearts, selectStreak, selectVBucks, selectCurrentPeriodId, selectCurrentLessonId } =
    userStatisticsSlice.selectors;

export default userStatisticsSlice.reducer;
