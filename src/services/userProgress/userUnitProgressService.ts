import type { UserUnitProgressDTO } from "../../DTOs/userProgressDTO/userUnitProgressDTO";
import ItemFetcher from "../../helpers/itemFetcher";

export class UserUnitProgressService {
    private static baseUrl = "/api";

    public static async getAll(): Promise<UserUnitProgressDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/userUnitProgresses/getAll.json`);

        return data;
    }

    public static async getAllByTopicId(topicId: number): Promise<UserUnitProgressDTO[]> {
        const data = await ItemFetcher.fetchItems(
            `${this.baseUrl}/topics/get/${topicId}/userUnitProgresses/getAll.json`
        );

        return data;
    }

    public static async getById(id: number): Promise<UserUnitProgressDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/userUnitProgresses/get/${id}.json`);

        return data;
    }

    public static async getByUnitId(unitId: number): Promise<UserUnitProgressDTO | null> {
        const userUnitProgresses = await this.getAll();

        const data = userUnitProgresses.filter((userUnitProgress) => userUnitProgress.unitId === unitId)[0];

        return data;
    }

    public static async getCountByTopicId(topicId: number): Promise<number> {
        const data = await this.getAllByTopicId(topicId);

        return data.length;
    }

    public static async getCurrentByTopicId(topicId: number): Promise<UserUnitProgressDTO | null> {
        const data = await this.getAllByTopicId(topicId);
        const lastElement = await this.getCountByTopicId(topicId);
        const lastElementIndex = lastElement - 1;

        return data[lastElementIndex];
    }
}
