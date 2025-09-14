import type { LessonDTO } from "../DTOs/lessonDTO";
import ItemFetcher from "../helpers/itemFetcher";

export class LessonService {
    private static baseUrl = "https://localhost:7213/api/Lesson";

    public static async getAll(): Promise<LessonDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}`);

        return data;
    }

    public static async getAllByLevelId(levelId: number): Promise<LessonDTO[]> {
        const data: LessonDTO[] = await ItemFetcher.fetchItems(`${this.baseUrl}/Level/${levelId}`);

        return data;
    }

    public static async getById(id: number): Promise<LessonDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/${id}`);

        return data;
    }

    // public static async getByLevelAndLessonIds(levelId: number, lessonId: number): Promise<LessonDTO | null> {
    //     const data: LessonDTO | null = await ItemFetcher.fetchItem(
    //         `${this.baseUrl}/Level/${levelId}/Lesson/${lessonId}.json`
    //     );

    //     return data;
    // }
}
