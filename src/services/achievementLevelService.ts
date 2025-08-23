import type { AchievementLevelDTO } from "../DTOs/achievementLevel";
import ItemFetcher from "../helpers/itemFetcher";

export class AchievementLevelService {
    private static baseUrl: string = "https://localhost:7213/api/admin/achievement-levels";

    public static async getAll(): Promise<AchievementLevelDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}`);

        return data;
    }

    public static async getById(id: number): Promise<AchievementLevelDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/${id}.json`);

        return data;
    }

    public static async getByAchievementIdAndLevel(
        achievementId: number,
        levelId: number
    ): Promise<AchievementLevelDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/Achievement/${achievementId}/Level/${levelId}.json`);

        return data;
    }
}
