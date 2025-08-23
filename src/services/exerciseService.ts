import type { ExerciseDTO } from "../DTOs/exerciseDTO";
import ItemFetcher from "../helpers/itemFetcher";

export default class ExerciseService {
    private static baseUrl = "https://localhost:7213/api/Exersice";

    public static async getAll(): Promise<ExerciseDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}`);

        return data;
    }

    public static async getAllByLessonId(lessonId: number): Promise<ExerciseDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/Lesson/${lessonId}`);

        return data;
    }

    public static async getById(id: number): Promise<ExerciseDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/${id}`);

        return data;
    }
}
