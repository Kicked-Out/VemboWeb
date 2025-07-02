import type { ExerciseDTO } from "../DTOs/exerciseDTO";

export default class ExerciseService {
    private static baseUrl = "/api";

    public static async getAll(): Promise<ExerciseDTO[]> {
        try {
            const response = await fetch(`${this.baseUrl}/exercises/getAll.json`);

            if (response.ok) {
                const data: ExerciseDTO[] = await response.json();

                return data;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Fetch failed:", error);

            return [];
        }
    }

    public static async getById(id: number): Promise<ExerciseDTO | null> {
        try {
            const response = await fetch(`${this.baseUrl}/exercises/get/${id}.json`);

            if (response.ok) {
                const data: ExerciseDTO = await response.json();

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
