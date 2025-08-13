import type { ExerciseDTO } from "../DTOs/exerciseDTO";
import ItemFetcher from "../helpers/itemFetcher";

export default class ExerciseService {
    private static baseUrl = "/api";

    public static async getAll(): Promise<ExerciseDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/exercises/getAll.json`);

        return data;
    }

    public static async getAllByLessonId(lessonId: number): Promise<ExerciseDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/lessons/get/${lessonId}/exercises/getAll.json`);

        return data;
    }

    public static async getById(id: number): Promise<ExerciseDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/exercises/get/${id}.json`);

        return data;
    }
}
