import type { TopicDTO } from "../DTOs/topicDTO";
import ItemFetcher from "../helpers/itemFetcher";

export default class TopicService {
    private static baseUrl = "https://localhost:7213/api";

    public static async getAll(): Promise<TopicDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/Topic`);

        return data;
    }

    public static async getById(id: number): Promise<TopicDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/Topic/${id}`);

        return data;
    }
}
