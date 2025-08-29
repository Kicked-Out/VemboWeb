import { configureStore } from "@reduxjs/toolkit";
import { userStatisticsSlice } from "./userStatisticsSlice";
import { LessonProgressSlice } from "./lessonProgressSlice";

export const store = configureStore({
    reducer: {
        userStatistics: userStatisticsSlice.reducer,
        lessonProgress: LessonProgressSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
