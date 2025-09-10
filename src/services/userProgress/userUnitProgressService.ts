import type { UserUnitProgressDTO } from "../../DTOs/userProgressDTO/userUnitProgressDTO";
import ItemFetcher from "../../helpers/itemFetcher";

export class UserUnitProgressService {
    private static baseUrl = "https://localhost:7213/api/UserUnitProgress";

    public static async getAll(): Promise<UserUnitProgressDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}`);

        return data;
    }

    public static async getAllByTopicId(topicId: number): Promise<UserUnitProgressDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/Topic/${topicId}`);

        return data;
    }

    public static async getById(id: number): Promise<UserUnitProgressDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/${id}`);

        return data;
    }

    public static async getByUnitId(unitId: number): Promise<UserUnitProgressDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/Unit/${unitId}`);

        return data;
    }

    public static async getCountByTopicId(topicId: number): Promise<number> {
        const data = await this.getAllByTopicId(topicId);

        return data.length;
    }

    public static async getCurrentByTopicId(topicId: number): Promise<UserUnitProgressDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/Current/${topicId}`);

        return data;
    }
}
