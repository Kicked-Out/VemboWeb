export interface UserAchievementDTO {
    id: number;
    userId: number;
    achievementId: number;
    currentLevel: number;
    progress: number;
    earnedAt: Date;
}
