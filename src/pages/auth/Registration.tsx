import AuthButton, { PrimaryButton, ShowPasswordButton, SocialButton } from "../../components/ui/primary-button";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { RegisterDTO } from "../../DTOs/auth/registerDTO";
import AuthService from "../../services/authService";
import { useDispatch } from "react-redux";
import { hideNavbar, hideSidebar } from "../../slices/menuSlice";
import { setToken } from "../../slices/authSlice";
import { Trans, useTranslation } from "react-i18next";

export default function SignUp() {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(hideNavbar());
        dispatch(hideSidebar());
    });

    type Inputs = {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    };

    const navigate = useNavigate();

    const { register, handleSubmit, watch } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        const registerDTO: RegisterDTO = {
            nickName: data.name,
            email: data.email,
            password: data.password,
        };

        try {
            const result = await AuthService.register(registerDTO);

            if (result) {
                dispatch(setToken(result));

                navigate("/");
            }
        } catch (err) {
            console.error("Auth error:", err);
        }
    };

    const password = watch("password");

    return (
        <div className="auth-page">
            {/* Log In Button - Top Right */}
            <AuthButton path="/login" title={t("auth.register.loginCta")} />

            {/* Main Content Container */}
            <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
                {/* Sign Up Section */}
                <div className="signup-hero">
                    {/* Welcome Text */}
                    <h1 className="signup-title">
                        <Trans i18nKey="auth.register.welcome">
                            <span className="text-white">Ready to </span>
                            <span className="text-light-blue">roam</span>
                            <span className="text-white">?</span>
                        </Trans>
                    </h1>

                    {/* Subtitle */}
                    <p className="signup-subtitle">
                        <Trans i18nKey="auth.register.subtitle" values={{ brand: t("brand") }}>
                            <span className="text-white">Create your passport to the past and future — </span>
                            <span className="text-light-blue">Vembo</span>
                            <span className="text-white"> will be your guide!</span>
                        </Trans>
                    </p>

                    {/* Form Container */}
                    <div className="form-block">
                        {/* Sign Up Form */}
                        <div className="form-fields">
                            {/* Name Input */}
                            <div className="input-group">
                                <div className="input-container">
                                    <div className="input-box" />
                                    <input
                                        {...register("name", { required: true })}
                                        placeholder={t("auth.register.name")}
                                        className="input"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="input-group">
                                <div className="input-container">
                                    <div className="input-box" />
                                    <input
                                        {...register("email", { required: true })}
                                        placeholder={t("auth.register.email")}
                                        type="email"
                                        className="input"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="input-group">
                                <div className="input-container">
                                    <div className="input-box" />
                                    <input
                                        {...register("password", {
                                            required: true,
                                            minLength: {
                                                value: 8,
                                                message: t("auth.register.passwordMinLength"),
                                            },
                                        })}
                                        placeholder={t("auth.common.password")}
                                        type={showPassword ? "text" : "password"}
                                        className="input input--with-toggle"
                                    />
                                    <div className="password-toggle">
                                        <ShowPasswordButton onClick={() => setShowPassword(!showPassword)} />
                                    </div>
                                </div>
                            </div>

                            {/* Confirm Password Input */}
                            <div className="input-group">
                                <div className="input-container">
                                    <div className="input-box" />
                                    <input
                                        {...register("confirmPassword", {
                                            required: true,
                                            validate: (value: string) =>
                                                value === password || t("auth.register.passwordMismatch"),
                                        })}
                                        placeholder={t("auth.register.confirmPassword")}
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="input input--with-toggle"
                                    />
                                    <div className="password-toggle">
                                        <ShowPasswordButton
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Create Account Button */}
                            <PrimaryButton title={t("auth.register.createAccount")} onClick={onSubmit} />
                        </div>

                        {/* Social Login Section */}
                        <div className="form-block">
                            {/* OR Divider */}
                            <div className="or">
                                <div className="or-line" />
                                <div className="or-text">{t("auth.common.or")}</div>
                                <div className="or-line" />
                            </div>

                            {/* Social Login Buttons */}
                            <div className="social-row">
                                {/* Google Button */}
                                <SocialButton
                                    title={t("auth.common.google")}
                                    social="https://img.icons8.com/?size=28&id=17949&format=png&color=000000"
                                    alt="Google"
                                />

                                {/* Facebook Button */}
                                <SocialButton
                                    title={t("auth.common.facebook")}
                                    social="https://img.icons8.com/?size=28&id=118467&format=png&color=1768D2"
                                    alt="Facebook"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Terms and Policy */}
                <div className="terms">
                    <p className="p-1line">{t("auth.register.terms", { brand: t("brand") })}</p>
                    <p className="p-2lines">
                        {t("auth.common.recaptcha")}
                    </p>
                </div>
            </form>
        </div>
    );
}
