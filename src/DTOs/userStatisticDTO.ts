export interface UserStatisticDTO {
    id: number;
    userId: string;
    streak: number;
    vBucks: number;
    hearts: number;
    totalXP: number;
    currentPeriodId: number;
    currentLessonId: number;
}
