import type { PeriodDTO } from "../DTOs/periodDTO";
import ItemFetcher from "../helpers/itemFetcher";

// PeriodService Example
export class PeriodService {
    private static baseUrl: string = "https://localhost:7213/api/Period";

    public static async getAll(): Promise<PeriodDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}`);

        return data;
    }

    public static async getById(id: number): Promise<PeriodDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/${id}`);

        return data;
    }
}
