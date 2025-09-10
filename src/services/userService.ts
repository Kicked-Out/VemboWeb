import type { UserDTO } from "../DTOs/auth/userDTO";
import ItemFetcher from "../helpers/itemFetcher";

export class UserService {
    private static baseUrl: string = "https://localhost:7213/api/User";

    public static async get(): Promise<UserDTO> {
        const data: UserDTO = await ItemFetcher.fetchItem(`${this.baseUrl}/Current`);

        data.nickNameSlug = data.nickName;

        return data;
    }

    public static async getById(id: string): Promise<UserDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/${id}`);

        return data;
    }

    public static async getByNickNameSlug(nickNameSlug: string): Promise<UserDTO | null> {
        const data = await ItemFetcher.fetchItem(`${this.baseUrl}/NickNameSlug/${nickNameSlug}`);

        return data;
    }
}
