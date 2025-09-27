import type { UpdateUserTotalXPDTO } from "../DTOs/updateUserTotalXP";
import type { UserLeaderboardDTO } from "../DTOs/userLeaderboardDTO";
import ItemFetcher from "../helpers/itemFetcher";

export default class UserLeaderboardService {
    private static baseUrl = "https://localhost:7213/api/admin/leaderboard";

    public static async getAll(): Promise<UserLeaderboardDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}`);

        return data;
    }

    public static async updateTotalXP(data: UpdateUserTotalXPDTO) {
        const response = await ItemFetcher.updateItem(`${this.baseUrl}/Current/TotalXP`, data);

        return response;
    }
}
