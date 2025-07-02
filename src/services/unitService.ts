import type { UnitDTO } from "../DTOs/unitDTO";

export class UnitService {
    private static baseUrl: string = "/api";

    public static async getAll(): Promise<UnitDTO[]> {
        try {
            const response = await fetch(`${this.baseUrl}/unit/getAll.json`);

            if (response.ok) {
                const data: UnitDTO[] = await response.json();

                return data;
            }

            return [];
        } catch (error) {
            console.error("Fetch error:", error);

            return [];
        }
    }

    public static async getById(id: number): Promise<UnitDTO | null> {
        try {
            const response = await fetch(`${this.baseUrl}/unit/get/${id}.json`);

            if (response.ok) {
                const data: UnitDTO = await response.json();

                return data;
            }

            return null;
        } catch (error) {
            console.error("Fetch error:", error);

            return null;
        }
    }
}
