import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { logout, selectUserData } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { NavbarComponent } from "../../types/componentTypes";
import { selectSelectedPage } from "../../slices/menuSlice";
import { useTranslation } from "react-i18next";

export default function NavBar({ isHidden }: NavbarComponent) {
    const user = useSelector(selectUserData);
    const selectedPage = useSelector(selectSelectedPage);

    const [moreOpen, setMoreOpen] = useState(false);
    const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const currentLanguage = (i18n.resolvedLanguage ?? i18n.language).toLowerCase();

    const openMore = () => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }

        setMoreOpen(true);
    };

    const blockHide = () => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
    };

    const closeMore = () => {
        hideTimeoutRef.current = setTimeout(() => {
            setMoreOpen(false);
        }, 1000);
    };

    const closeMoreImmediately = () => {
        setMoreOpen(false);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const changeLanguage = (lng: "en" | "uk") => {
        const resolved = i18n.resolvedLanguage ?? i18n.language;

        if (resolved.startsWith(lng)) return;

        void i18n.changeLanguage(lng);
    };

    return (
        <nav className={`navbar ${isHidden ? "hidden" : ""}`} onClick={closeMoreImmediately}>
            <Link to="/" className="nav-title">
                {t("brand")}
            </Link>
            <Link to="/" className={`nav-btn ${selectedPage === 0 ? "nav-btn-selected" : ""}`}>
                <img className="nav-icon" src="/src/assets/icons/glacier.png" />
                {t("nav.learn")}
            </Link>
            <Link to="/practice-hub" className={`nav-btn ${selectedPage === 1 ? "nav-btn-selected" : ""}`}>
                <img className="nav-icon" src="/src/assets/icons/practice.png" />
                {t("nav.practice")}
            </Link>
            <Link to="/leaderboards" className={`nav-btn ${selectedPage === 2 ? "nav-btn-selected" : ""}`}>
                <img className="nav-icon" src="/src/assets/icons/leaderboards.png" />
                {t("nav.leaderboards")}
            </Link>
            <Link to="/quests" className={`nav-btn ${selectedPage === 3 ? "nav-btn-selected" : ""}`}>
                <img className="nav-icon" src="/src/assets/icons/chest.png" />
                {t("nav.quests")}
            </Link>
            <Link to="/shop" className={`nav-btn ${selectedPage === 4 ? "nav-btn-selected" : ""}`}>
                <img className="nav-icon" src="/src/assets/icons/shop.png" />
                {t("nav.shop")}
            </Link>
            <Link
                to={`/profile/${user?.nickName}`}
                className={`nav-btn ${selectedPage === 5 ? "nav-btn-selected" : ""}`}
            >
                <img
                    className="nav-profile-icon"
                    src={user?.avatarUrl ? user?.avatarUrl : "/src/assets/icons/profile_default_icon.png"}
                />
                {t("nav.profile")}
            </Link>

            <div className="nav-btn more-container" onMouseEnter={openMore} onMouseLeave={closeMore}>
                <div className="more-toggle">
                    <img className="nav-icon" src="/src/assets/icons/more.png" />
                    <span>{t("nav.more")}</span>
                </div>

                <div
                    className={`more-menu ${moreOpen ? "more-menu-open" : "more-menu-closed"}`}
                    onMouseEnter={blockHide}
                    role="menu"
                    aria-hidden={!moreOpen}
                >
                    <Link to="/settings" className="more-menu-item" onClick={closeMoreImmediately}>
                        {t("nav.settings")}
                    </Link>

                    <div
                        className="more-menu-item"
                        onClick={() => {
                            handleLogout();
                            closeMoreImmediately();
                        }}
                    >
                        {t("nav.logout")}
                    </div>

                    <Link to="/help" className="more-menu-item" onClick={closeMoreImmediately}>
                        {t("nav.help")}
                    </Link>
                    <div className="more-menu-language">
                        <span className="more-menu-language__label">{t("nav.language.label")}</span>
                        <div className="more-menu-language__options">
                            <button
                                type="button"
                                className={`more-menu-language__option ${currentLanguage.startsWith("en") ? "selected" : ""}`}
                                onClick={() => changeLanguage("en")}
                            >
                                {t("nav.language.english")}
                            </button>
                            <button
                                type="button"
                                className={`more-menu-language__option ${currentLanguage.startsWith("uk") ? "selected" : ""}`}
                                onClick={() => changeLanguage("uk")}
                            >
                                {t("nav.language.ukrainian")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
