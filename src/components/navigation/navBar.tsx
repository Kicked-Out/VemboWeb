import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { logout, selectUserData } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { NavbarComponent } from "../../types/componentTypes";
import { selectSelectedPage } from "../../slices/menuSlice";

export default function NavBar({ isHidden }: NavbarComponent) {
    const user = useSelector(selectUserData);
    const selectedPage = useSelector(selectSelectedPage);

    const [moreOpen, setMoreOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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

    const toggleMore = () => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }

        setMoreOpen((previous) => !previous);
    };

    const closeMoreImmediately = () => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }

        setMoreOpen(false);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((previous) => !previous);
    };

    const handleNavItemClick = () => {
        closeMobileMenu();
        closeMoreImmediately();
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const navClasses = ["navbar"];

    if (isHidden) {
        navClasses.push("hidden");
    }

    if (isMobileMenuOpen) {
        navClasses.push("is-open");
    }

    return (
        <nav className={navClasses.join(" ")} aria-label="Primary navigation">
            <div className="navbar__brand-row">
                <Link to="/" className="nav-title" onClick={handleNavItemClick}>
                    Vembo
                </Link>
                <button
                    type="button"
                    className="nav__toggle"
                    onClick={toggleMobileMenu}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="primary-navigation"
                >
                    <span className="sr-only">
                        {isMobileMenuOpen ? "Close navigation" : "Open navigation"}
                    </span>
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        {isMobileMenuOpen ? (
                            <path
                                fill="currentColor"
                                d="M6.4 5.1 5 6.5 10.5 12 5 17.5l1.4 1.4L12 13.4l5.6 5.5 1.4-1.4L13.4 12l5.6-5.5-1.4-1.4L12 10.6z"
                            />
                        ) : (
                            <path fill="currentColor" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                        )}
                    </svg>
                </button>
            </div>

            <div className="navbar__menu" id="primary-navigation">
                <Link
                    to="/"
                    className={`nav-btn ${selectedPage === 0 ? "nav-btn-selected" : ""}`}
                    onClick={handleNavItemClick}
                    aria-current={selectedPage === 0 ? "page" : undefined}
                >
                    <img className="nav-icon" src="/src/assets/icons/glacier.png" alt="Learn" loading="lazy" />
                    Learn
                </Link>
                <Link
                    to="/practice-hub"
                    className={`nav-btn ${selectedPage === 1 ? "nav-btn-selected" : ""}`}
                    onClick={handleNavItemClick}
                    aria-current={selectedPage === 1 ? "page" : undefined}
                >
                    <img className="nav-icon" src="/src/assets/icons/practice.png" alt="Practice" loading="lazy" />
                    Practice
                </Link>
                <Link
                    to="/leaderboards"
                    className={`nav-btn ${selectedPage === 2 ? "nav-btn-selected" : ""}`}
                    onClick={handleNavItemClick}
                    aria-current={selectedPage === 2 ? "page" : undefined}
                >
                    <img
                        className="nav-icon"
                        src="/src/assets/icons/leaderboards.png"
                        alt="Leaderboards"
                        loading="lazy"
                    />
                    Leaderboards
                </Link>
                <Link
                    to="/quests"
                    className={`nav-btn ${selectedPage === 3 ? "nav-btn-selected" : ""}`}
                    onClick={handleNavItemClick}
                    aria-current={selectedPage === 3 ? "page" : undefined}
                >
                    <img className="nav-icon" src="/src/assets/icons/chest.png" alt="Quests" loading="lazy" />
                    Quests
                </Link>
                <Link
                    to="/shop"
                    className={`nav-btn ${selectedPage === 4 ? "nav-btn-selected" : ""}`}
                    onClick={handleNavItemClick}
                    aria-current={selectedPage === 4 ? "page" : undefined}
                >
                    <img className="nav-icon" src="/src/assets/icons/shop.png" alt="Shop" loading="lazy" />
                    Shop
                </Link>
                <Link
                    to={`/profile/${user?.nickName}`}
                    className={`nav-btn ${selectedPage === 5 ? "nav-btn-selected" : ""}`}
                    onClick={handleNavItemClick}
                    aria-current={selectedPage === 5 ? "page" : undefined}
                >
                    <img
                        className="nav-profile-icon"
                        src={user?.avatarUrl ? user?.avatarUrl : "/src/assets/icons/profile_default_icon.png"}
                        alt="Profile avatar"
                        loading="lazy"
                    />
                    Profile
                </Link>

                <div className="more-container" onMouseEnter={openMore} onMouseLeave={closeMore}>
                    <button
                        type="button"
                        className={`nav-btn more-toggle ${moreOpen ? "nav-btn-selected" : ""}`}
                        onClick={toggleMore}
                        aria-expanded={moreOpen}
                        aria-controls="more-menu"
                    >
                        <img className="nav-icon" src="/src/assets/icons/more.png" alt="More" loading="lazy" />
                        <span>More</span>
                    </button>

                    <div
                        id="more-menu"
                        className={`more-menu ${moreOpen ? "more-menu-open" : "more-menu-closed"}`}
                        onMouseEnter={blockHide}
                        role="menu"
                        aria-hidden={!moreOpen}
                    >
                        <Link to="/settings" className="more-menu-item" onClick={handleNavItemClick}>
                            Settings
                        </Link>

                        <button
                            type="button"
                            className="more-menu-item"
                            onClick={() => {
                                handleLogout();
                                handleNavItemClick();
                            }}
                        >
                            Log out
                        </button>

                        <Link to="/help" className="more-menu-item" onClick={handleNavItemClick}>
                            Help
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
