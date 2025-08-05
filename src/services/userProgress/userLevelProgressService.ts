import type { UserLevelProgressDTO } from "../../DTOs/userProgressDTO/userLevelProgressDTO";
import ItemFetcher from "../../helpers/itemFetcher";

export class UserLevelProgressService {
    private static baseUrl = "/api";

    public static async getAll(): Promise<UserLevelProgressDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/userLevelProgresses/getAll.json`);

        return data;
    }

    public static async getById(id: number): Promise<UserLevelProgressDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/userLevelProgresses/get/${id}.json`);

        return data;
    }

    public static async getByLevelId(levelId: number): Promise<UserLevelProgressDTO | null> {
        const userLevelProgresses = await this.getAll();

        const data = userLevelProgresses.filter((userLevelProgress) => userLevelProgress.levelId === levelId)[0];

        return data;
    }
}
