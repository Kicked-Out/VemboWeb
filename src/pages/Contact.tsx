import { useDispatch } from "react-redux";
import "../styles/contact.css";
import { useEffect } from "react";
import { hideSidebar, showNavbar } from "../slices/menuSlice";
import { useTranslation } from "react-i18next";

export default function Contact() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(showNavbar());
        dispatch(hideSidebar());
    }, []);

    return (
        <div className="contact-page">
            <h1 className="contact-title">{t("pages.contact.title")}</h1>
            <p className="contact-text">
                {t("pages.contact.press")}
                <span className="contact-email"> {"press@vembo.com"}</span>
            </p>
            <p className="contact-text">
                {t("pages.contact.partner")}
                <span className="contact-email"> {"partnerships@vembo.com"}</span>
            </p>
            <img src="/images/contact-bear.png" alt={t("pages.contact.bearAlt")} className="contact-bear" />
        </div>
    );
}
