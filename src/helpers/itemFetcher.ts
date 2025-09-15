export default class ItemFetcher {
    public static async fetchItem(url: string) {
        try {
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();

                return data;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Fetch failed:", error);

            return null;
        }
    }

    public static async fetchItems(url: string) {
        const data = await this.fetchItem(url);

        return data !== null ? data : [];
    }
}
