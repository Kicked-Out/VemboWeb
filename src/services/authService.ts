import { instance } from "../api/axios.api";
import type { ChangePasswordDTO } from "../DTOs/auth/changePasswordDTO";
import type { ForgotPasswordDTO } from "../DTOs/auth/forgotPasswordDTO";
import type { LoginDTO } from "../DTOs/auth/loginDTO";
import type { RegisterDTO } from "../DTOs/auth/registerDTO";
import type { resetPasswordDTO } from "../DTOs/auth/resetPasswordDTO";
import type { UserDTO } from "../DTOs/auth/userDTO";
import { removeToken } from "../helpers/localStorage.helper";

export default class AuthService {
    public static async login(userData: LoginDTO): Promise<string | undefined> {
        const result = await instance.post<string>("users/login", userData);

        return result.data;
    }

    public static async register(userData: RegisterDTO): Promise<void> {
        await instance.post("users/register", userData);
    }

    public static async logout(): Promise<void> {
        removeToken();
    }

    public static async changePassword(userData: ChangePasswordDTO): Promise<void> {
        userData.id = "string";

        await instance.put("users/change-password", userData);
    }

    public static async forgotPassword(userData: ForgotPasswordDTO): Promise<boolean> {
        const result = await instance.post("users/forgot-password", userData);

        return result.status == 200 ? true : false;
    }

    public static async resetPassword(userData: resetPasswordDTO): Promise<boolean> {
        const result = await instance.post("users/reset-password", userData);

        return result.status == 200 ? true : false;
    }

    public static async get(): Promise<UserDTO> {
        const result = await instance.get("users/get.json");

        return result.data;
    }
}
