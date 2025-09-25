import type { QuestDTO } from "../../DTOs/questDTO";
import type { UserQuestProgressDTO } from "../../DTOs/userProgressDTO/userQuestProgressDTO";
import ItemFetcher from "../../helpers/itemFetcher";

export class UserQuestProgressService {
    private static baseUrl = "https://localhost:7213/api/user-quest-progress";

    public static async getAll(): Promise<UserQuestProgressDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}`);

        return data;
    }

    public static async getAllMonthly(): Promise<UserQuestProgressDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/monthly`);

        return data;
    }

    public static async getById(id: number): Promise<UserQuestProgressDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/${id}`);

        return data;
    }

    public static async getByQuestId(questId: number): Promise<UserQuestProgressDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/quest/${questId}`);

        return data;
    }

    public static async updateProgress(quest: QuestDTO) {
        const response = await ItemFetcher.updateItem(`${this.baseUrl}`, quest);

        return response;
    }
}
