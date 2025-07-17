import type { LessonDTO } from "../DTOs/lessonDTO";
import ItemFetcher from "../helpers/itemFetcher";

export class LessonService {
    private static baseUrl = "/api";

    public static async getAll(): Promise<LessonDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/lessons/getAll.json`);

        return data;
    }

    public static async getById(id: number): Promise<LessonDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/lessons/get/${id}.json`);

        return data;
    }
}
