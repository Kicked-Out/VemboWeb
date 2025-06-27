import type { TopicDTO } from "../DTOs/topicDTO";

export default class TopicService {
    private static baseUrl = "/api";

    public static async getAll(): Promise<TopicDTO[]> {
        try {
            const response = await fetch(`${this.baseUrl}/topics/getAll.json`);

            if (response.ok) {
                const data: TopicDTO[] = await response.json();

                return data;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Fetch failed:", error);

            return [];
        }
    }

    public static async getById(id: number): Promise<TopicDTO | null> {
        try {
            const response = await fetch(`${this.baseUrl}/topics/get/${id}.json`);

            if (response.ok) {
                const data: TopicDTO = await response.json();

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
