import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="container">
                <p className="text-center">
                    {t("footer.copyright", {
                        year: new Date().getFullYear(),
                        brand: t("brand"),
                    })}
                </p>
            </div>
        </footer>
    );
}
