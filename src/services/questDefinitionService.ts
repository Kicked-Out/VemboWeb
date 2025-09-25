import type { QuestDefinitionDTO } from "../DTOs/questDefinitionDTO";
import ItemFetcher from "../helpers/itemFetcher";

export class QuestDefinitionService {
    private static baseUrl: string = "https://localhost:7213/api/quest-definitions";

    public static async getAll(): Promise<QuestDefinitionDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}`);

        return data;
    }

    public static async getById(id: number): Promise<QuestDefinitionDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/${id}`);

        return data;
    }
}
