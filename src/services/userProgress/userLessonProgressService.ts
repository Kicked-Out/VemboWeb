import type { UserLessonProgressDTO } from "../../DTOs/userProgressDTO/userLessonProgressDTO";
import ItemFetcher from "../../helpers/itemFetcher";

export class UserLessonProgressService {
    private static baseUrl = "/api";

    public static async getAll(): Promise<UserLessonProgressDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/userLessonProgresses/getAll.json`);

        return data;
    }

    public static async getById(id: number): Promise<UserLessonProgressDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/userLessonProgresses/get/${id}.json`);

        return data;
    }
}
