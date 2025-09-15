import type { QuestionDTO } from "../DTOs/questionDTO";
import ItemFetcher from "../helpers/itemFetcher";

export class QuestionService {
    private static baseUrl = "/api";

    public static async getAllFromExercise(exerciseId: number): Promise<QuestionDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/exercises/get/${exerciseId}/questions/getAll.json`);

        return data;
    }

    public static async getByIdFromExercise(exerciseId: number, questionId: number): Promise<QuestionDTO | null> {
        const data = await ItemFetcher.fetchItem(
            `${this.baseUrl}/exercises/get/${exerciseId}/questions/get/${questionId}.json`
        );

        return data;
    }
}
