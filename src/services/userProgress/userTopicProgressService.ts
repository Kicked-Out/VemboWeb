import type { UserTopicProgressDTO } from "../../DTOs/userProgressDTO/userTopicProgressDTO";
import ItemFetcher from "../../helpers/itemFetcher";

export class UserTopicProgressService {
    private static baseUrl = "/api";

    public static async getAll(): Promise<UserTopicProgressDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/userTopicProgresses/getAll.json`);

        return data;
    }

    public static async getById(id: number): Promise<UserTopicProgressDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/userTopicProgresses/get/${id}.json`);

        return data;
    }
}
