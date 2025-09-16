import { instance } from "../api/axios.api";

export default class ItemFetcher {
    public static async fetchItem(url: string) {
        try {
            const response = await instance.get(url);

            if (response.status === 200) {
                return response.data;
            } else if (response.status === 404) {
                // console.error("Fetch failed:");
            }
        } catch {
            return null;
        }
    }

    public static async fetchItems(url: string) {
        const data = await this.fetchItem(url);

        return data !== null ? data : [];
    }

    public static async createItem<T>(url: string, body: any): Promise<T | null> {
        try {
            const response = await instance.post(url, body);

            if (response.status === 200 || response.status === 201) {
                return response.data as T;
            }

            return null;
        } catch {
            return null;
        }
    }

    public static async updateItem<T>(url: string, body: any): Promise<T | null> {
        try {
            const response = await instance.put(url, body);

            if (response.status === 200) {
                return response.data as T;
            }

            return null;
        } catch {
            return null;
        }
    }

    public static async deleteItem(url: string): Promise<boolean> {
        try {
            const response = await instance.delete(url);

            if (response.status === 200) {
                return true;
            }

            return false;
        } catch {
            return false;
        }
    }
}
