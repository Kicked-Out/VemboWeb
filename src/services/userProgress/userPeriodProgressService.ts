import type { UserPeriodProgressDTO } from "../../DTOs/userProgressDTO/userPeriodProgressDTO";
import ItemFetcher from "../../helpers/itemFetcher";

export class UserPeriodProgressService {
    public static baseUrl = "/api";

    public static async getAll(): Promise<UserPeriodProgressDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/userPeriodProgresses/getAll.json`);

        return data;
    }

    public static async getByPeriodId(periodId: number): Promise<UserPeriodProgressDTO | null> {
        const data = await ItemFetcher.fetchItem(
            `${this.baseUrl}/periods/get/${periodId}/userPeriodProgresses/get.json`
        );

        return data;
    }

    public static async getById(id: number): Promise<UserPeriodProgressDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/userPeriodProgresses/get/${id}.json`);

        return data;
    }
}
