import type { AnswerDTO } from "../DTOs/answerDTO";

export class AnswerService {
    private static baseUrl = "/api";

    public static async getAllFromExerciseAndQuestion(exerciseId: number, questionId: number): Promise<AnswerDTO[]> {
        try {
            const response = await fetch(
                `${this.baseUrl}/exercises/get/${exerciseId}/questions/get/${questionId}/answers/getAll.json`
            );

            if (response.ok) {
                const data: AnswerDTO[] = await response.json();

                return data;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Fetch failed:", error);

            return [];
        }
    }

    public static async getByIdFromExerciseAndQuestion(
        exerciseId: number,
        questionId: number,
        answerId: number
    ): Promise<AnswerDTO | null> {
        try {
            const response = await fetch(
                `${this.baseUrl}/exercises/get/${exerciseId}/questions/get/${questionId}/answers/get/${answerId}.json`
            );

            if (response.ok) {
                const data: AnswerDTO = await response.json();

                return data;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Fetch failed:", error);

            return null;
        }
    }
}
