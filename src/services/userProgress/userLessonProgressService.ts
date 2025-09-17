import type { UserLessonProgressDTO } from "../../DTOs/userProgressDTO/userLessonProgressDTO";
import ItemFetcher from "../../helpers/itemFetcher";

export class UserLessonProgressService {
    private static baseUrl = "https://localhost:7213/api/UserLessonProgress";

    public static async getAll(): Promise<UserLessonProgressDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}`);

        return data;
    }

    public static async getAllByLevelId(levelId: number): Promise<UserLessonProgressDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/Level/${levelId}`);

        return data;
    }

    public static async getById(id: number): Promise<UserLessonProgressDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/${id}`);

        return data;
    }

    public static async getCurrentByLevelId(levelId: number): Promise<UserLessonProgressDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/Current/${levelId}`);

        return data;
    }
}
