import type { UserDTO } from "../DTOs/auth/userDTO";
import ItemFetcher from "../helpers/itemFetcher";

export class UserService {
    private static baseUrl: string = "/api";

    public static async get(): Promise<UserDTO> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/users/get.json`);

        return data;
    }
}
