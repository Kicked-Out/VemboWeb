import type { LessonDTO } from "../DTOs/lessonDTO";

export class LessonService {
    private static baseUrl = "/api";

    public static async getAll(): Promise<LessonDTO[]> {
        try {
            const response = await fetch(`${this.baseUrl}/lessons/getAll.json`);

            if (response.ok) {
                const data: LessonDTO[] = await response.json();

                return data;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Fetch failed:", error);

            return [];
        }
    }

    public static async getById(id: number): Promise<LessonDTO | null> {
        try {
            const response = await fetch(`${this.baseUrl}/lessons/get/${id}.json`);

            if (response.ok) {
                const data: LessonDTO = await response.json();

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
