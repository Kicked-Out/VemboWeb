import type { UserUnitProgressDTO } from "../../DTOs/userProgressDTO/userUnitProgressDTO";
import ItemFetcher from "../../helpers/itemFetcher";

export class UserUnitProgressService {
    private static baseUrl = "/api";

    public static async getAll(): Promise<UserUnitProgressDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/userUnitProgresses/getAll.json`);

        return data;
    }

    public static async getById(id: number): Promise<UserUnitProgressDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/userUnitProgresses/get/${id}.json`);

        return data;
    }
}
