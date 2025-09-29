import { useEffect, useRef, useState } from "react";
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
    const [isDesktop, setIsDesktop] = useState(false);
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

    const toggleMore = () => {
        blockHide();
        setMoreOpen((prev) => !prev);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleNavLinkClick = () => {
        closeMobileMenu();
        closeMoreImmediately();
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mediaQuery = window.matchMedia("(min-width: 768px)");

        const handleChange = (event: MediaQueryListEvent) => {
            setIsDesktop(event.matches);

            if (event.matches) {
                setIsMobileMenuOpen(false);
            }
        };

        if (mediaQuery.matches) {
            setIsDesktop(true);
            setIsMobileMenuOpen(false);
        } else {
            setIsDesktop(false);
        }

        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", handleChange);

            return () => {
                mediaQuery.removeEventListener("change", handleChange);
            };
        }

        mediaQuery.addListener(handleChange);

        return () => {
            mediaQuery.removeListener(handleChange);
        };
    }, []);

    useEffect(() => {
        if (isDesktop) {
            document.body.style.removeProperty("overflow");
            return () => {
                document.body.style.removeProperty("overflow");
            };
        }

        if (isMobileMenuOpen) {
            document.body.style.setProperty("overflow", "hidden");
        } else {
            document.body.style.removeProperty("overflow");
        }

        return () => {
            document.body.style.removeProperty("overflow");
        };
    }, [isMobileMenuOpen, isDesktop]);

    useEffect(() => {
        if (!isMobileMenuOpen) {
            closeMoreImmediately();
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            <nav className={`navbar ${isHidden ? "hidden" : ""} ${isMobileMenuOpen ? "navbar--open" : ""}`}>
                <div className="navbar__bar">
                    <Link to="/" className="nav-title" onClick={handleNavLinkClick}>
                        Vembo
                    </Link>

                    <button
                        type="button"
                        className="nav__toggle"
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="primary-navigation"
                        onClick={toggleMobileMenu}
                    >
                        <span className="sr-only">{isMobileMenuOpen ? "Close navigation" : "Open navigation"}</span>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            viewBox="0 0 24 24"
                            className="nav__toggle-icon"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    d="M6 6l12 12M6 18L18 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            ) : (
                                <path
                                    d="M4 7h16M4 12h16M4 17h16"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                <div
                    id="primary-navigation"
                    className="nav__menu"
                    role="menu"
                    aria-hidden={!isDesktop && !isMobileMenuOpen}
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
                        />
                        <span>Learn</span>
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
                        />
                        <span>Practice</span>
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
                        />
                        <span>Leaderboards</span>
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
                        />
                        <span>Quests</span>
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
                        />
                        <span>Shop</span>
                    </Link>
                    <Link
                        to={`/profile/${user?.nickName}`}
                        className={`nav-btn ${selectedPage === 5 ? "nav-btn-selected" : ""}`}
                        onClick={handleNavLinkClick}
                    >
                        <img
                            className="nav-profile-icon"
                            src={
                                user?.avatarUrl
                                    ? user?.avatarUrl
                                    : "/src/assets/icons/profile_default_icon.png"
                            }
                            alt="Profile"
                            loading="lazy"
                        />
                        <span>Profile</span>
                    </Link>

                    <div
                        className={`nav-btn more-container ${moreOpen ? "more-container--open" : ""}`}
                        onMouseEnter={openMore}
                        onMouseLeave={closeMore}
                    >
                        <button
                            type="button"
                            className="more-toggle"
                            onClick={(event) => {
                                event.stopPropagation();
                                toggleMore();
                            }}
                            aria-expanded={moreOpen}
                            aria-controls="more-navigation"
                        >
                            <img
                                className="nav-icon"
                                src="/src/assets/icons/more.png"
                                alt="More"
                                loading="lazy"
                            />
                            <span>More</span>
                        </button>

                        <div
                            id="more-navigation"
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
                                    handleNavLinkClick();
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

            {isMobileMenuOpen ? (
                <button
                    type="button"
                    className="nav__overlay"
                    aria-hidden="true"
                    tabIndex={-1}
                    onClick={toggleMobileMenu}
                />
            ) : null}
        </>
    );
}
