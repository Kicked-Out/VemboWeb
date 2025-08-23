import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { LoginDTO } from "../../DTOs/auth/loginDTO";
import AuthService from "../../services/authService";

export default function Login() {
    const navigate = useNavigate();

    type Inputs = {
        emailOrName: string;
        password: string;
    };

    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const loginDTO: LoginDTO = {
            email: data.emailOrName,
            password: data.password,
        };

        const result = await AuthService.login(loginDTO);

        if (result) {
            localStorage.setItem("token", result);

            navigate("/");
        }
    };

    return (
        <div className="">
            <h1>Login</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("emailOrName", { required: true })} placeholder="Email or Name" />

                <input {...register("password", { required: true })} placeholder="Password" type="password" />

                <Link to="/forgot_password">Forgot?</Link>

                <input type="submit" value="Sign In" />
            </form>

            <p>
                Don't have an account yet? <Link to="/register">Register</Link>
            </p>

            <div>
                <hr />
                Or
                <hr />
            </div>

            <div>
                <div>
                    <div>Google</div>

                    <div>Facebook</div>
                </div>

                <div>
                    <div>Apple</div>
                </div>
            </div>
        </div>
    );
}
