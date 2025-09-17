import { instance } from "../api/axios.api";
import type { ChangePasswordDTO } from "../DTOs/auth/changePasswordDTO";
import type { ForgotPasswordDTO } from "../DTOs/auth/forgotPasswordDTO";
import type { LoginDTO } from "../DTOs/auth/loginDTO";
import type { RegisterDTO } from "../DTOs/auth/registerDTO";
import type { resetPasswordDTO } from "../DTOs/auth/resetPasswordDTO";
import type { UserDTO } from "../DTOs/auth/userDTO";
import { removeToken } from "../helpers/localStorage.helper";

interface LoginResponse {
    token: string;
}

export default class AuthService {
    public static async login(userData: LoginDTO): Promise<string | undefined> {
        const result = await instance.post<LoginResponse>("login", userData);

        return result.data.token;
    }

    public static async register(userData: RegisterDTO): Promise<string | undefined> {
        const result = await instance.post<LoginResponse>("register", userData);

        return result.data.token;
    }

    public static async logout(): Promise<void> {
        removeToken();
    }

    public static async changePassword(userData: ChangePasswordDTO): Promise<void> {
        userData.id = "string";

        await instance.put("change-password", userData);
    }

    public static async forgotPassword(userData: ForgotPasswordDTO): Promise<boolean> {
        const result = await instance.post("forgot-password", userData);

        return result.status == 200 ? true : false;
    }

    public static async resetPassword(userData: resetPasswordDTO): Promise<boolean> {
        const result = await instance.post("reset-password", userData);

        return result.status == 200 ? true : false;
    }

    public static async get(): Promise<UserDTO> {
        const result = await instance.get("../user/current");

        const user: UserDTO = result.data;
        user.nickNameSlug = user.nickName;

        return user;
    }

    public static async validateToken(): Promise<boolean> {
        try {
            const result = await instance.get("validate-token");

            if (result.status === 401) {
                return false;
            }

            return true;
        } catch (error: any) {
            return false;
        }
    }
}
