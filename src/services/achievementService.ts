import type { AchievementDTO } from "../DTOs/achievementDTO";
import ItemFetcher from "../helpers/itemFetcher";

export class AchievementService {
    private static baseUrl: string = "/api";

    public static async getAll(): Promise<AchievementDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/achievements/getAll.json`);

        return data;
    }

    public static async getById(id: number): Promise<AchievementDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/achievements/get/${id}.json`);

        return data;
    }
}
