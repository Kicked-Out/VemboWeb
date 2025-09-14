import type { AnswerDTO } from "../DTOs/answerDTO";
import ItemFetcher from "../helpers/itemFetcher";

export class AnswerService {
    private static baseUrl = "https://localhost:7213/api/Answer";

    public static async getAllByQuestionId(questionId: number): Promise<AnswerDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/Question/${questionId}`);

        return data;
    }

    public static async getById(id: number): Promise<AnswerDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/${id}.json`);

        return data;
    }
}
