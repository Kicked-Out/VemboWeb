import type { UserLevelProgressDTO } from "../../DTOs/userProgressDTO/userLevelProgressDTO";
import ItemFetcher from "../../helpers/itemFetcher";

export class UserLevelProgressService {
    private static baseUrl = "https://localhost:7213/api/UserLevelProgress";

    public static async getAll(): Promise<UserLevelProgressDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}`);

        return data;
    }

    public static async getById(id: number): Promise<UserLevelProgressDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/${id}`);

        return data;
    }

    public static async getByLevelId(levelId: number): Promise<UserLevelProgressDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/Level/${levelId}`);

        return data;
    }
}
