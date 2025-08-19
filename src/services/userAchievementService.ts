import type { UserAchievementDTO } from "../DTOs/userAchievementDTO";
import ItemFetcher from "../helpers/itemFetcher";

export class UserAchievementService {
    private static baseUrl: string = "/api";

    public static async getAll(): Promise<UserAchievementDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/userAchievements/getAll.json`);

        return data;
    }

    public static async getByUserId(userId: string): Promise<UserAchievementDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/users/get/${userId}/userAchievements/getAll.json`);

        return data;
    }
}
