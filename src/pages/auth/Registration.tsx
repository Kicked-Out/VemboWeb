import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Registration() {
    type Inputs = {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    };

    const password = watch("password");

    return (
        <div>
            <h1>Profile Creating</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...(register("name"), { required: false })} placeholder="Name (Optional)" />

                <input {...(register("email"), { required: true })} placeholder="Email" />

                <input
                    {...register("password", {
                        required: true,
                        minLength: { value: 8, message: "Password must be at least 8 characters" },
                    })}
                    placeholder="Password"
                    type="password"
                />

                {errors.password && <p>{errors.password.message}</p>}

                <input
                    {...register("confirmPassword", {
                        required: true,
                        validate: (value: string) => value === password || "Passwords do not match",
                    })}
                    placeholder="Confirm Password"
                    type="password"
                />

                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

                <input type="submit" value={"Create Profile"} />
            </form>

            <p>
                Already have an account? <Link to="/login">Sign In</Link>
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
