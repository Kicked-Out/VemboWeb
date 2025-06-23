import type { PeriodDTO } from "../DTOs/periodDTO";

// PeriodService Example
export class PeriodService {
    private static baseUrl: string = "/api";

    public static async getAll(): Promise<PeriodDTO[]> {
        try {
            const response = await fetch(`${this.baseUrl}/periods/getAll.json`);

            if (response.ok) {
                const data: PeriodDTO[] = await response.json();

                return data;
            }

            return [];
        } catch (error) {
            console.error("Fetch error:", error);

            return [];
        }
    }

    public static async getById(id: number): Promise<PeriodDTO | null> {
        try {
            const response = await fetch(`${this.baseUrl}/periods/get/${id}.json`);

            if (response.ok) {
                const data: PeriodDTO = await response.json();

                return data;
            }

            return null;
        } catch (error) {
            console.error("Fetch error:", error);

            return null;
        }
    }
}
