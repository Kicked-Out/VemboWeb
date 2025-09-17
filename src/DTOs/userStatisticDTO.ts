export interface UserStatisticDTO {
    id: number;
    userId: string;
    streak: number;
    vBucks: number;
    hearts: number;
    currentPeriodId: number;
    currentLessonId: number;
}
