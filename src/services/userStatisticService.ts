import type { userStatisticDTO } from "../DTOs/userStatisticDTO";
import ItemFetcher from "../helpers/itemFetcher";

export default class UserStatisticService {
    private static baseUrl = "/api";

    public static async getAll(): Promise<userStatisticDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/userStatistics/getAll.json`);

        return data;
    }

    public static async getByUserId(userId: number): Promise<userStatisticDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/users/get/${userId}/userStatistic/get.json`);

        return data;
    }

    public static async getById(id: number): Promise<userStatisticDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/userStatistics/get/${id}.json`);

        return data;
    }
}
