import type { MedalDTO } from "../DTOs/medalDTO";
import ItemFetcher from "../helpers/itemFetcher";

export class MedalService {
    private static baseUrl: string = "https://localhost:7213/api/medals";

    public static async getAll(): Promise<MedalDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}`);

        return data;
    }

    public static async getById(id: number): Promise<MedalDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/${id}`);

        return data;
    }
}
