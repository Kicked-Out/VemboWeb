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
}
