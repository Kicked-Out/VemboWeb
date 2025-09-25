import type { QuestDTO } from "../DTOs/questDTO";
import ItemFetcher from "../helpers/itemFetcher";

export class QuestService {
    private static baseUrl: string = "https://localhost:7213/api/quests";

    public static async getAll(): Promise<QuestDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}`);

        return data;
    }

    public static async getAllMonthly(): Promise<QuestDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/monthly`);

        return data;
    }

    public static async getCurrentDaily(): Promise<QuestDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/Current/Daily`);

        return data;
    }

    public static async getById(id: number): Promise<QuestDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/${id}`);

        return data;
    }

    public static async getCurrentMonthly(): Promise<QuestDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/current/monthly`);

        return data;
    }
}
