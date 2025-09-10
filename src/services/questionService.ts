import type { QuestionDTO } from "../DTOs/questionDTO";
import ItemFetcher from "../helpers/itemFetcher";

export class QuestionService {
    private static baseUrl = "https://localhost:7213/api/Question";

    public static async getAllByExercise(exerciseId: number): Promise<QuestionDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/Exercise/${exerciseId}`);

        console.log(data);

        return data;
    }

    public static async getById(id: number): Promise<QuestionDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/${id}`);

        return data;
    }
}
