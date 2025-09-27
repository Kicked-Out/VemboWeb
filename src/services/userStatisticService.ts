import type { UpdateCoinsDTO } from "../DTOs/updateCoinsDTO";
import type { UpdateUserTotalXPDTO } from "../DTOs/updateUserTotalXP";
import type { UserStatisticDTO } from "../DTOs/userStatisticDTO";
import ItemFetcher from "../helpers/itemFetcher";

export default class UserStatisticService {
    private static baseUrl = "https://localhost:7213/api/user-statistics";

    public static async getAll(): Promise<UserStatisticDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}`);

        return data;
    }

    public static async getByUserId(userId: string): Promise<UserStatisticDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/User/${userId}`);

        return data;
    }

    public static async getById(id: number): Promise<UserStatisticDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/${id}`);

        return data;
    }

    public static async updateTotalXP(data: UpdateUserTotalXPDTO) {
        const response = await ItemFetcher.updateItem(`${this.baseUrl}/Current/TotalXP/`, data);

        return response;
    }

    public static async updateVBucks(data: UpdateCoinsDTO) {
        const response = await ItemFetcher.updateItem(`${this.baseUrl}/Current/Coins/`, data);

        return response;
    }
}
