import type { UnitDTO } from "../DTOs/unitDTO";
import ItemFetcher from "../helpers/itemFetcher";

export class UnitService {
    private static baseUrl: string = "/api";

    public static async getAll(): Promise<UnitDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/units/getAll.json`);

        return data;
    }

    public static async getAllByTopicId(topicId: number): Promise<UnitDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/topics/get/${topicId}/units/getAll.json`);

        return data;
    }

    public static async getById(id: number): Promise<UnitDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/units/get/${id}.json`);

        return data;
    }
}
