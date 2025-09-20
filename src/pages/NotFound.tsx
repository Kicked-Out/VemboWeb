import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideNavbar, hideSidebar } from "../slices/menuSlice";
import { useTranslation } from "react-i18next";

export default function NotFound() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(hideNavbar());
        dispatch(hideSidebar());
    }, []);

    return (
        <div>
            <h1>{t("pages.notFound.title")}</h1>
            <p>{t("pages.notFound.description")}</p>
        </div>
    );
}
