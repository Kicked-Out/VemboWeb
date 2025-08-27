import type { LevelDTO } from "../DTOs/levelDTO";
import ItemFetcher from "../helpers/itemFetcher";

export class LevelService {
    private static baseUrl: string = "https://localhost:7213/api/Level";

    public static async getAll(): Promise<LevelDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}`);

        return data;
    }

    public static async getAllByUnitId(unitId: number): Promise<LevelDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/Unit/${unitId}`);

        return data;
    }

    public static async getById(id: number): Promise<LevelDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/${id}`);

        return data;
    }
}
