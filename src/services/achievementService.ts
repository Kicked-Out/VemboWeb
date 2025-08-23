import type { AchievementDTO } from "../DTOs/achievementDTO";
import ItemFetcher from "../helpers/itemFetcher";

export class AchievementService {
    private static baseUrl: string = "https://localhost:7213/api/admin/achievements";

    public static async getAll(): Promise<AchievementDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}`);

        return data;
    }

    public static async getById(id: number): Promise<AchievementDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/${id}`);

        return data;
    }
}
