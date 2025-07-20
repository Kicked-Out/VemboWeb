import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Login() {
    type Inputs = {
        emailOrName: string;
        password: string;
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    };

    return (
        <div>
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
