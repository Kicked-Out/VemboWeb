import { useDispatch } from "react-redux";
import { ReturnButton } from "../../components/ui/primary-button";
import { useEffect } from "react";
import { hideNavbar, hideSidebar } from "../../slices/menuSlice";
import { Trans, useTranslation } from "react-i18next";

export default function PasswordUpdated() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(hideNavbar());
        dispatch(hideSidebar());
    });

    return (
        <div className="auth-overlay">
            <div className="content-narrow">
                <div className="confirm-text">
                    {/* Password Updated Heading */}
                    <h1 className="page-title-lg">
                        <Trans i18nKey="auth.passwordUpdated.title">
                            <span className="text-white">Password </span>
                            <span className="text-accent">Updated</span>
                            <span className="text-white">!</span>
                        </Trans>
                    </h1>

                    {/* Success Message */}
                    <p className="page-subtitle-lg message-narrow">
                        <Trans i18nKey="auth.passwordUpdated.message">
                            <span className="text-white">Your password has been changed successfully. Use your </span>
                            <span className="text-accent">new password</span>
                            <span className="text-white"> to Log in.</span>
                        </Trans>
                    </p>
                </div>

                {/* Return to Login Button */}
                <ReturnButton title={t("auth.passwordUpdated.return")} path="/" />
            </div>
        </div>
    );
}
