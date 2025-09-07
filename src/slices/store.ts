import { configureStore } from "@reduxjs/toolkit";
import { userStatisticsSlice } from "./userStatisticsSlice";
import { LessonProgressSlice } from "./lessonProgressSlice";
import { authSlice } from "./authSlice";
import { menuSlice } from "./menuSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        userStatistics: userStatisticsSlice.reducer,
        lessonProgress: LessonProgressSlice.reducer,
        menu: menuSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
