import type { UserAchievementDTO } from "../DTOs/userAchievementDTO";
import ItemFetcher from "../helpers/itemFetcher";

export class UserAchievementService {
    private static baseUrl: string = "https://localhost:7213/api/admin/user-achievements";

    public static async getAll(): Promise<UserAchievementDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}`);

        return data;
    }

    public static async getByUserId(userId: string): Promise<UserAchievementDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/User/${userId}/`);

        return data;
    }
}
