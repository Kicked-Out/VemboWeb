// import { useForm, type SubmitHandler } from "react-hook-form";

// export default function ResetPassword() {
//     type Inputs = {
//         newPassword: string;
//         confirmNewPassword: string;
//     }

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         watch,
//     } = useForm<Inputs>();

//     const onSubmit: SubmitHandler<Inputs> = (data) => {
//         console.log(data);
//     }

//     const newPassword = watch("newPassword");

//     return (
//         <div>
//             <h2>Reset Password</h2>

//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <input {...register("newPassword", { required: true, minLength: { value: 8, message: "Password must be at least 8 characters" }})} placeholder="New Password" type="password"/>

//                 { errors.newPassword && <p>{errors.newPassword.message}</p> }

//                 <input {...register("confirmNewPassword", { required: true, minLength: { value: 8, message: "Password must be at least 8 characters" }, validate: (value: string) => value === newPassword || "Passwords do not match"})} placeholder="Confirm New Password" type="password"/>

//                 { errors.confirmNewPassword && <p>{errors.confirmNewPassword.message}</p> }
//                 <input type="submit" value="Submit"/>
//             </form>
//         </div>
//     )
// }

import { useForm, type SubmitHandler } from "react-hook-form";
import { PrimaryButton, ShowPasswordButton } from "../../components/ui/primary-button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideNavbar, hideSidebar } from "../../slices/menuSlice";
import { useTranslation } from "react-i18next";

export default function ResetPassword() {
    const dispatch = useDispatch();
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(hideNavbar());
        dispatch(hideSidebar());
    });

    type Inputs = {
        newPassword: string;
        confirmNewPassword: string;
    };

    const { register, handleSubmit, watch } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = () => {
        navigate("/password-updated");
    };

    const newPassword = watch("newPassword");

    return (
        <div className="auth-overlay">
            <div className="content-narrow">
                {/* Title */}
                <h1 className="page-title-lg">{t("auth.resetPassword.title")}</h1>

                {/* Form section */}
                <div className="form-section-left" style={{ width: "100%" }}>
                    <form onSubmit={handleSubmit(onSubmit)} className="form-fields-left" style={{ width: "100%" }}>
                        {/* New Password */}
                        <div className="input-group">
                            <div className="input-container">
                                <div className="input-box" />
                                <input
                                    {...register("newPassword", {
                                        required: true,
                                        minLength: {
                                            value: 8,
                                            message: t("auth.register.passwordMinLength"),
                                        },
                                    })}
                                    placeholder={t("auth.resetPassword.newPassword")}
                                    type={showNewPassword ? "text" : "password"}
                                    className="input input--with-toggle"
                                />
                                <div className="password-toggle">
                                    <ShowPasswordButton onClick={() => setShowNewPassword(!showNewPassword)} />
                                </div>
                            </div>
                        </div>

                        {/* Confirm New Password */}
                        <div className="input-group">
                            <div className="input-container">
                                <div className="input-box" />
                                <input
                                    {...register("confirmNewPassword", {
                                        required: true,
                                        minLength: {
                                            value: 8,
                                            message: t("auth.register.passwordMinLength"),
                                        },
                                        validate: (value: string) =>
                                            value === newPassword || t("auth.register.passwordMismatch"),
                                    })}
                                    placeholder={t("auth.resetPassword.confirmNewPassword")}
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="input input--with-toggle"
                                />
                                <div className="password-toggle">
                                    <ShowPasswordButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <PrimaryButton title={t("auth.resetPassword.submit")} onClick={handleSubmit(onSubmit)} />
                    </form>
                </div>
            </div>
        </div>
    );
}
