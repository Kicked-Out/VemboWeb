import type { AchievementLevelDTO } from "../DTOs/achievementLevel";
import ItemFetcher from "../helpers/itemFetcher";

export class AchievementLevelService {
    private static baseUrl: string = "/api";

    public static async getAll(): Promise<AchievementLevelDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/achievements/get/achievementLevels/getAll.json`);

        return data;
    }

    public static async getById(id: number): Promise<AchievementLevelDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/achievements/get/achievementLevels/get/${id}.json`);

        return data;
    }

    public static async getByAchievementIdAndLevel(
        achievementId: number,
        level: number
    ): Promise<AchievementLevelDTO | null> {
        const data = await ItemFetcher.fetchItem(
            `${this.baseUrl}/achievements/get/${achievementId}/achievementLevels/getByLevel/${level}.json`
        );

        return data;
    }
}
