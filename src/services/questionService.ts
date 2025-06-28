import type { QuestionDTO } from "../DTOs/questionDTO";

export class QuestionService {
    private static baseUrl = "/api";

    public static async getAllFromExercise(exerciseId: number): Promise<QuestionDTO[]> {
        try {
            const response = await fetch(`${this.baseUrl}/exercises/get/${exerciseId}/questions/getAll.json`);

            if (response.ok) {
                const data: QuestionDTO[] = await response.json();

                return data;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Fetch failed:", error);

            return [];
        }
    }

    public static async getByIdFromExercise(exerciseId: number, questionId: number): Promise<QuestionDTO | null> {
        try {
            const response = await fetch(
                `${this.baseUrl}/exercises/get/${exerciseId}/questions/get/${questionId}.json`
            );

            if (response.ok) {
                const data: QuestionDTO = await response.json();

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
