import type { RootState } from "./store";

export const selectUserStatistics = (state: RootState) => state.userStatistics;
export const selectUserData = (state: RootState) => state.auth;
