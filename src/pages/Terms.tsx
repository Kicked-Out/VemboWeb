import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideSidebar, showNavbar } from "../slices/menuSlice";
import { Trans, useTranslation } from "react-i18next";

export default function Terms() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(showNavbar());
        dispatch(hideSidebar());
    }, []);

    return (
        <div className="terms-page">
            <div className="terms-container">
                <h1 className="terms-title">
                    <Trans i18nKey="pages.terms.title">
                        <span>Terms and Conditions of Service for </span>
                        <span className="terms-title-accent">Young Explorers</span>
                    </Trans>
                </h1>
                <p className="terms-subtitle">{t("pages.terms.subtitle")}</p>

                <div className="terms-item">
                    <h2 className="terms-item-heading">{t("pages.terms.sections.who.heading")}</h2>
                    <p className="terms-item-description">{t("pages.terms.sections.who.description")}</p>
                </div>

                <div className="terms-item">
                    <h2 className="terms-item-heading">{t("pages.terms.sections.using.heading")}</h2>
                    <p className="terms-item-description">{t("pages.terms.sections.using.description")}</p>
                </div>

                <div className="terms-item">
                    <h2 className="terms-item-heading">{t("pages.terms.sections.premium.heading")}</h2>
                    <p className="terms-item-description">{t("pages.terms.sections.premium.description")}</p>
                </div>

                <div className="terms-item">
                    <h2 className="terms-item-heading">{t("pages.terms.sections.learning.heading")}</h2>
                    <p className="terms-item-description">{t("pages.terms.sections.learning.description")}</p>
                </div>

                <div className="terms-item">
                    <h2 className="terms-item-heading">{t("pages.terms.sections.privacy.heading")}</h2>
                    <p className="terms-item-description">{t("pages.terms.sections.privacy.description")}</p>
                </div>

                <div className="terms-item">
                    <h2 className="terms-item-heading">{t("pages.terms.sections.changes.heading")}</h2>
                    <p className="terms-item-description">{t("pages.terms.sections.changes.description")}</p>
                </div>

                <div className="terms-item">
                    <h2 className="terms-item-heading">{t("pages.terms.sections.questions.heading")}</h2>
                    <p className="terms-item-description">{t("pages.terms.sections.questions.description")}</p>
                </div>

                <div className="terms-divider" />

                <p className="terms-bottom">{t("pages.terms.bottom", { brand: t("brand") })}</p>
            </div>
        </div>
    );
}
