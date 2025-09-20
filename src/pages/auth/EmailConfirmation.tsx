import { useDispatch } from "react-redux";
import { ReturnButton } from "../../components/ui/primary-button";
import { useEffect } from "react";
import { hideNavbar, hideSidebar } from "../../slices/menuSlice";
import { useTranslation } from "react-i18next";

export default function EmailConfirmation() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(hideNavbar());
        dispatch(hideSidebar());
    });

    return (
        <div className="auth-page-full">
            <div className="content-narrow">
                {/* Envelope SVG */}
                <img
                    src="src/assets/email.svg"
                    alt={t("auth.emailConfirmation.alt")}
                    className="confirm-illustration"
                />

                {/* Text Content */}
                <div className="confirm-text">
                    <h1 className="page-title-lg">{t("auth.emailConfirmation.title")}</h1>
                    <p className="page-subtitle-lg">{t("auth.emailConfirmation.subtitle")}</p>
                </div>

                {/* Reset Password Button */}
                <ReturnButton title={t("auth.emailConfirmation.return")} path="/reset-password" />
            </div>
        </div>
    );
}
