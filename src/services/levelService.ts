import type { LevelDTO } from "../DTOs/levelDTO";

export class LevelService {
    private static baseUrl: string = "/api";

    public static async getAll(): Promise<LevelDTO[]> {
        try {
            const response = await fetch(`${this.baseUrl}/levels/getAll.json`);

            if (response.ok) {
                const data: LevelDTO[] = await response.json();

                return data;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Failed to Fetch:", error);

            return [];
        }
    }

    public static async getById(id: number): Promise<LevelDTO | null> {
        try {
            const response = await fetch(`${this.baseUrl}/levels/get/${id}.json`);

            if (response.ok) {
                const data: LevelDTO = await response.json();

                return data;
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);

            return null;
        }
    }
}
