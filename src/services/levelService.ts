import type { LevelDTO } from "../DTOs/levelDTO";
import ItemFetcher from "../helpers/itemFetcher";

export class LevelService {
    private static baseUrl: string = "/api";

    public static async getAll(): Promise<LevelDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/levels/getAll.json`);

        return data;
    }

    public static async getAllByUnitId(unitId: number): Promise<LevelDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/units/get/${unitId}/levels/getAll.json`);

        return data;
    }

    public static async getById(id: number): Promise<LevelDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/levels/get/${id}.json`);

        return data;
    }
}
