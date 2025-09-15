import type { AnswerDTO } from "../DTOs/answerDTO";
import ItemFetcher from "../helpers/itemFetcher";

export class AnswerService {
    private static baseUrl = "/api";

    public static async getAllFromExerciseAndQuestion(exerciseId: number, questionId: number): Promise<AnswerDTO[]> {
        const data = await ItemFetcher.fetchItems(
            `${this.baseUrl}/exercises/get/${exerciseId}/questions/get/${questionId}/answers/getAll.json`
        );

        return data;
    }

    public static async getByIdFromExerciseAndQuestion(
        exerciseId: number,
        questionId: number,
        answerId: number
    ): Promise<AnswerDTO | null> {
        const data = await ItemFetcher.fetchItem(
            `${this.baseUrl}/exercises/get/${exerciseId}/questions/get/${questionId}/answers/get/${answerId}.json`
        );

        return data;
    }
}
