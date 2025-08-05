import { useForm, type SubmitHandler } from "react-hook-form";

export default function ResetPassword() {
    type Inputs = {
        newPassword: string;
        confirmNewPassword: string;
    }
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    }

    const newPassword = watch("newPassword");

    return (
        <div>
            <h2>Reset Password</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("newPassword", { required: true, minLength: { value: 8, message: "Password must be at least 8 characters" }})} placeholder="New Password" type="password"/>

                { errors.newPassword && <p>{errors.newPassword.message}</p> }

                <input {...register("confirmNewPassword", { required: true, minLength: { value: 8, message: "Password must be at least 8 characters" }, validate: (value: string) => value === newPassword || "Passwords do not match"})} placeholder="Confirm New Password" type="password"/>

                { errors.confirmNewPassword && <p>{errors.confirmNewPassword.message}</p> }
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}