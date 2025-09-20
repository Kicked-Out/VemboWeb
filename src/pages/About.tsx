import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideSidebar, showNavbar } from "../slices/menuSlice";
import { useTranslation } from "react-i18next";

export default function About() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(showNavbar());
        dispatch(hideSidebar());
    }, []);

    return (
        <div className="about-page">
            <h1 className="about-title">{t("pages.about.title")}</h1>
            <div className="about-divider" />
            <div className="about-grid">
                <div className="about-column">
                    <div className="about-row">
                        <h2 className="about-subtitle">{t("pages.about.personalized.title")}</h2>
                        <p className="about-description">{t("pages.about.personalized.description")}</p>
                    </div>
                    <div className="about-row">
                        <h2 className="about-subtitle">{t("pages.about.fun.title")}</h2>
                        <p className="about-description">{t("pages.about.fun.description")}</p>
                    </div>
                </div>
                <div className="about-column">
                    <div className="about-row">
                        <h2 className="about-subtitle">{t("pages.about.accessible.title")}</h2>
                        <p className="about-description">{t("pages.about.accessible.description")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
