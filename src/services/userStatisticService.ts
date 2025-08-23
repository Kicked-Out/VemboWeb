import type { UserStatisticDTO } from "../DTOs/userStatisticDTO";
import ItemFetcher from "../helpers/itemFetcher";

export default class UserStatisticService {
    private static baseUrl = "https://localhost:7213/api/admin";

    public static async getAll(): Promise<UserStatisticDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/user-statistics`);

        return data;
    }

    public static async getByUserId(userId: string): Promise<UserStatisticDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/User/${userId}`);

        return data;
    }

    public static async getById(id: number): Promise<UserStatisticDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/user-statistics/${id}`);

        return data;
    }
}
