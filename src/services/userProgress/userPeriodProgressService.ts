import type { UserPeriodProgressDTO } from "../../DTOs/userProgressDTO/userPeriodProgressDTO";
import ItemFetcher from "../../helpers/itemFetcher";

export class UserPeriodProgressService {
    public static baseUrl = "https://localhost:7213/api/UserPeriodProgress";

    public static async getAll(): Promise<UserPeriodProgressDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}`);

        return data;
    }

    public static async getByPeriodId(periodId: number): Promise<UserPeriodProgressDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/Period/${periodId}`);

        return data;
    }

    public static async getById(id: number): Promise<UserPeriodProgressDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/${id}`);

        return data;
    }

    public static async getWithMostXPByUserId(userId: string): Promise<UserPeriodProgressDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/WithMostXP/User/${userId}`);

        return data;
    }
}
