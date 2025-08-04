import type { UserExerciseMistakeDTO } from "../../DTOs/userProgressDTO/userExerciseMistakeDTO";
import ItemFetcher from "../../helpers/itemFetcher";

export class UserExerciseMistakeService {
    private static baseUrl = "/api";

    public static async getAll(): Promise<UserExerciseMistakeDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/userExerciseMistakes/getAll.json`);

        return data;
    }

    public static async getById(id: number): Promise<UserExerciseMistakeDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/userExerciseMistakes/get/${id}.json`);

        return data;
    }
}
