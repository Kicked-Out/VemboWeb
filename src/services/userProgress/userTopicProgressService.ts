import type { UserTopicProgressDTO } from "../../DTOs/userProgressDTO/userTopicProgressDTO";
import ItemFetcher from "../../helpers/itemFetcher";

export class UserTopicProgressService {
    private static baseUrl = "/api";

    public static async getAll(): Promise<UserTopicProgressDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/userTopicProgresses/getAll.json`);

        return data;
    }

    public static async getAllByPeriodId(periodId: number): Promise<UserTopicProgressDTO[]> {
        const data = await ItemFetcher.fetchItems(
            `${this.baseUrl}/periods/get/${periodId}/userTopicProgresses/getAll.json`
        );

        return data;
    }

    public static async getById(id: number): Promise<UserTopicProgressDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/userTopicProgresses/get/${id}.json`);

        return data;
    }

    public static async getCountByPeriodId(periodId: number): Promise<number> {
        const data = await this.getAllByPeriodId(periodId);

        return data.length;
    }

    public static async getCurrentByPeriodId(periodId: number): Promise<UserTopicProgressDTO | null> {
        const data = await this.getAllByPeriodId(periodId);
        const lastElement = await this.getCountByPeriodId(periodId);
        const lastElementIndex = lastElement - 1;

        return data[lastElementIndex];
    }
}
