import AuthButton, { PrimaryButton, SocialButton } from "../../components/ui/primary-button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { LoginDTO } from "../../DTOs/auth/loginDTO";
import AuthService from "../../services/authService";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { hideNavbar, hideSidebar } from "../../slices/menuSlice";
import { setToken } from "../../slices/authSlice";
import { Trans, useTranslation } from "react-i18next";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    type Inputs = {
        emailOrName: string;
        password: string;
    };

    useEffect(() => {
        dispatch(hideNavbar());
        dispatch(hideSidebar());
    });

    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (data.emailOrName === undefined || data.password === undefined) return;

        const loginDTO: LoginDTO = {
            email: data.emailOrName,
            password: data.password,
        };

        const result = await AuthService.login(loginDTO);

        if (result) {
            dispatch(setToken(result));

            navigate("/");
        }
    };

    return (
        <div className="auth-page">
            {/* Sign Up Button - Top Right */}
            <AuthButton path="/register" title={t("auth.common.signUp")} />

            {/* Main Content Container */}
            <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
                {/* Login Section */}
                <div className="signup-hero">
                    {/* Welcome Text */}
                    <h1 className="signup-title">
                        <Trans i18nKey="auth.login.welcome">
                            <span className="text-white">Welcome back </span>
                            <span className="text-light-blue">explorer</span>
                            <span className="text-white">!</span>
                        </Trans>
                    </h1>

                    {/* Subtitle */}
                    <p className="signup-subtitle" style={{ maxWidth: 476 }}>
                        <Trans i18nKey="auth.login.tagline" values={{ brand: t("brand") }}>
                            <span className="text-white">History's calling, and the globe's spinning — hop on, </span>
                            <span className="text-light-blue">Vembo's</span>
                            <span className="text-white"> taking off!</span>
                        </Trans>
                    </p>

                    {/* Form Container */}
                    <div className="form-block">
                        {/* Login Form */}
                        <div className="form-fields">
                            {/* Email / Username */}
                            <div className="input-group">
                                <div className="input-container">
                                    <div className="input-box" />
                                    <input
                                        {...register("emailOrName", { required: true })}
                                        placeholder={t("auth.common.emailOrName")}
                                        className="input"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="input-group">
                                <div className="input-container">
                                    <div className="input-box" />
                                    <input
                                        {...register("password", { required: true })}
                                        placeholder={t("auth.common.password")}
                                        type="password"
                                        className="input"
                                    />
                                    <Link to="/forgot-password" className="forgot-link">
                                        {t("auth.common.forgot")}
                                    </Link>
                                </div>
                            </div>

                            {/* Login Button */}
                            <PrimaryButton title={t("auth.common.logIn")} onClick={onSubmit} />
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
                                <SocialButton
                                    title={t("auth.common.google")}
                                    social="https://img.icons8.com/?size=28&id=17949&format=png&color=000000"
                                    alt="Google"
                                />
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
                    <p className="p-1line">{t("auth.common.termsSignIn", { brand: t("brand") })}</p>
                    <p className="p-2lines">
                        {t("auth.common.recaptcha")}
                    </p>
                </div>
            </form>
        </div>
    );
}
