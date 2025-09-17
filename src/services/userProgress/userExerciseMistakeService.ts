import type { UserExerciseMistakeDTO } from "../../DTOs/userProgressDTO/userExerciseMistakeDTO";
import ItemFetcher from "../../helpers/itemFetcher";

export class UserExerciseMistakeService {
    private static baseUrl = "https://localhost:7213/api/UserExerciseMistake";

    public static async getAll(): Promise<UserExerciseMistakeDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}`);

        return data;
    }

    public static async getById(id: number): Promise<UserExerciseMistakeDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/${id}`);

        return data;
    }

    public static async addMistake(body: any) {
        const response = await ItemFetcher.createItem(`${this.baseUrl}`, body);

        return response;
    }

    public static async removeMistake(id: number): Promise<boolean> {
        const response = await ItemFetcher.deleteItem(`${this.baseUrl}/${id}`);

        return response;
    }
}
