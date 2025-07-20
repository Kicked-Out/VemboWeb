import { useForm, type SubmitHandler } from "react-hook-form";

export default function RestorePassword() {
    type Inputs = {
        email: string;
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    }

    return (
        <div>
            <h2>Forgot password</h2>
            <p>We'll send you instructions on how to reset your password by email</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("email", { required: true })} placeholder="Email" type="email"/>

                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}