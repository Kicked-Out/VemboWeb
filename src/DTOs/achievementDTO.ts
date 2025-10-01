export interface AchievementDTO {
    id: number;
    code: string;
    title: string;
    description: string;
    isCompleted: boolean;
    targetType: string;
    iconUrl: string;
    completedIconUrl: string;
}
