import type { LessonDTO } from "../../DTOs/lessonDTO";
import type { UserLessonProgressDTO } from "../../DTOs/userProgressDTO/userLessonProgressDTO";
import ItemFetcher from "../../helpers/itemFetcher";

export class UserLessonProgressService {
    private static baseUrl = "/api";

    public static async getAll(): Promise<UserLessonProgressDTO[]> {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/userLessonProgresses/getAll.json`);

        return data;
    }

    public static async getAllByLevelId(levelId: number) {
        const data = await ItemFetcher.fetchItems(`${this.baseUrl}/levels/get/1/userLessonProgresses/getAll.json`);

        return data;
    }

    public static async getById(id: number): Promise<UserLessonProgressDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/userLessonProgresses/get/${id}.json`);

        return data;
    }

    public static async getCountByLevelId(levelId: number): Promise<number> {
        const data = await this.getAllByLevelId(levelId);

        return data.length;
    }

    public static async getCurrentByLevelId(levelId: number): Promise<LessonDTO> {
        const data = await this.getAllByLevelId(levelId);
        const lastElement = await this.getCountByLevelId(levelId);
        const lastElementIndex = lastElement - 1;

        return data[lastElementIndex];
    }
}
