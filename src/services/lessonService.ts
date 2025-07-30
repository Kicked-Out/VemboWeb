import type { LessonDTO } from "../DTOs/lessonDTO";
import ItemFetcher from "../helpers/itemFetcher";

export class LessonService {
    private static baseUrl = "/api";

    public static async getAll(): Promise<LessonDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/lessons/getAll.json`);

        return data;
    }

    public static async getAllByLevelId(levelId: number): Promise<LessonDTO[]> {
        const data: LessonDTO[] = await ItemFetcher.fetchItems(
            `${this.baseUrl}/levels/get/${levelId}/lessons/getAll.json`
        );

        return data;
    }

    public static async getById(id: number): Promise<LessonDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/lessons/get/${id}.json`);

        return data;
    }

    public static async getByLevelAndLessonIds(levelId: number, lessonId: number): Promise<LessonDTO | null> {
        const data: LessonDTO | null = await ItemFetcher.fetchItem(
            `${this.baseUrl}/levels/get/${levelId}/lessons/get/${lessonId}.json`
        );

        return data;
    }
}
