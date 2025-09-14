import type { UnitDTO } from "../DTOs/unitDTO";
import ItemFetcher from "../helpers/itemFetcher";

export class UnitService {
    private static baseUrl: string = "https://localhost:7213/api/Unit";

    public static async getAll(): Promise<UnitDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}`);

        return data;
    }

    public static async getAllByTopicId(topicId: number): Promise<UnitDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/Topic/${topicId}`);

        return data;
    }

    public static async getById(id: number): Promise<UnitDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/${id}`);

        return data;
    }
}
