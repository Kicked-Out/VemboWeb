import type { PeriodDTO } from "../DTOs/periodDTO";
import ItemFetcher from "../helpers/itemFetcher";

// PeriodService Example
export class PeriodService {
    private static baseUrl: string = "/api";

    public static async getAll(): Promise<PeriodDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/periods/getAll.json`);

        return data;
    }

    public static async getById(id: number): Promise<PeriodDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/periods/get/${id}.json`);

        return data;
    }
}
