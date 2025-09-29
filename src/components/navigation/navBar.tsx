import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { logout, selectUserData } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { NavbarComponent } from "../../types/componentTypes";
import { selectSelectedPage } from "../../slices/menuSlice";

export default function NavBar({ isHidden }: NavbarComponent) {
    const user = useSelector(selectUserData);
    const selectedPage = useSelector(selectSelectedPage);

    const [moreOpen, setMoreOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const hideTimeoutRef = useRef<any>(null);
    const dispatch = useDispatch();

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
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }

        setMoreOpen(false);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const closeMenu = () => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }

        setIsMenuOpen(false);
        setMoreOpen(false);
    };

    const handleNavLinkClick = () => {
        closeMenu();
    };

    const toggleMenu = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setIsMenuOpen((prev) => !prev);
    };

    const toggleMoreMenu = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        if (moreOpen) {
            closeMoreImmediately();
            return;
        }

        openMore();
    };

    useEffect(() => {
        if (!isHidden) return;

        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }

        setIsMenuOpen(false);
        setMoreOpen(false);
    }, [isHidden]);

    const navClassName = `navbar ${isHidden ? "hidden" : ""} ${isMenuOpen ? "navbar--open" : ""}`;

    return (
        <>
            <nav className={navClassName}>
                <div className="navbar__header">
                    <Link to="/" className="nav-title" onClick={handleNavLinkClick}>
                        Vembo
                    </Link>

                    <button
                        type="button"
                        className="nav-toggle"
                        aria-expanded={isMenuOpen}
                        aria-controls="primary-navigation"
                        onClick={toggleMenu}
                    >
                        <span className="sr-only">{isMenuOpen ? "Close navigation" : "Open navigation"}</span>
                        <span className="nav-toggle__bar" aria-hidden="true" />
                    </button>
                </div>

                <div
                    id="primary-navigation"
                    className="nav-links"
                    data-state={isMenuOpen ? "open" : "closed"}
                >
                    <Link
                        to="/"
                        className={`nav-btn ${selectedPage === 0 ? "nav-btn-selected" : ""}`}
                        onClick={handleNavLinkClick}
                    >
                        <img
                            className="nav-icon"
                            src="/src/assets/icons/glacier.png"
                            alt="Learn"
                            loading="lazy"
                            decoding="async"
                        />
                        Learn
                    </Link>
                    <Link
                        to="/practice-hub"
                        className={`nav-btn ${selectedPage === 1 ? "nav-btn-selected" : ""}`}
                        onClick={handleNavLinkClick}
                    >
                        <img
                            className="nav-icon"
                            src="/src/assets/icons/practice.png"
                            alt="Practice"
                            loading="lazy"
                            decoding="async"
                        />
                        Practice
                    </Link>
                    <Link
                        to="/leaderboards"
                        className={`nav-btn ${selectedPage === 2 ? "nav-btn-selected" : ""}`}
                        onClick={handleNavLinkClick}
                    >
                        <img
                            className="nav-icon"
                            src="/src/assets/icons/leaderboards.png"
                            alt="Leaderboards"
                            loading="lazy"
                            decoding="async"
                        />
                        Leaderboards
                    </Link>
                    <Link
                        to="/quests"
                        className={`nav-btn ${selectedPage === 3 ? "nav-btn-selected" : ""}`}
                        onClick={handleNavLinkClick}
                    >
                        <img
                            className="nav-icon"
                            src="/src/assets/icons/chest.png"
                            alt="Quests"
                            loading="lazy"
                            decoding="async"
                        />
                        Quests
                    </Link>
                    <Link
                        to="/shop"
                        className={`nav-btn ${selectedPage === 4 ? "nav-btn-selected" : ""}`}
                        onClick={handleNavLinkClick}
                    >
                        <img
                            className="nav-icon"
                            src="/src/assets/icons/shop.png"
                            alt="Shop"
                            loading="lazy"
                            decoding="async"
                        />
                        Shop
                    </Link>
                    <Link
                        to={`/profile/${user?.nickName}`}
                        className={`nav-btn ${selectedPage === 5 ? "nav-btn-selected" : ""}`}
                        onClick={handleNavLinkClick}
                    >
                        <img
                            className="nav-profile-icon"
                            src={user?.avatarUrl ? user?.avatarUrl : "/src/assets/icons/profile_default_icon.png"}
                            alt={`${user?.nickName ?? "Profile"} avatar`}
                            loading="lazy"
                            decoding="async"
                        />
                        Profile
                    </Link>

                    <div
                        className="nav-btn more-container"
                        onMouseEnter={openMore}
                        onMouseLeave={closeMore}
                    >
                        <button
                            type="button"
                            className="more-toggle"
                            aria-expanded={moreOpen}
                            aria-controls="more-menu"
                            onClick={toggleMoreMenu}
                        >
                            <img
                                className="nav-icon"
                                src="/src/assets/icons/more.png"
                                alt="More"
                                loading="lazy"
                                decoding="async"
                            />
                            <span>More</span>
                        </button>

                        <div
                            id="more-menu"
                            className={`more-menu ${moreOpen ? "more-menu-open" : "more-menu-closed"}`}
                            onMouseEnter={blockHide}
                            role="menu"
                            aria-hidden={!moreOpen}
                        >
                            <Link to="/settings" className="more-menu-item" onClick={handleNavLinkClick}>
                                Settings
                            </Link>

                            <button
                                type="button"
                                className="more-menu-item"
                                onClick={() => {
                                    handleLogout();
                                    closeMenu();
                                }}
                            >
                                Log out
                            </button>

                            <Link to="/help" className="more-menu-item" onClick={handleNavLinkClick}>
                                Help
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div
                className={`nav-overlay ${isMenuOpen ? "nav-overlay--visible" : ""}`}
                aria-hidden="true"
                onClick={closeMenu}
            />
        </>
    );
}
