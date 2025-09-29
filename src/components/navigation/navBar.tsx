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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState<boolean>(() => {
        if (typeof window === "undefined") {
            return true;
        }

        return window.innerWidth >= 1024;
    });
    const hideTimeoutRef = useRef<any>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleResize = () => {
            if (typeof window === "undefined") return;

            const isWide = window.innerWidth >= 1024;
            setIsDesktop(isWide);

            if (isWide) {
                setIsMenuOpen(false);
                setMoreOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const openMore = () => {
        if (!isDesktop) {
            setMoreOpen((prev) => !prev);
            return;
        }

        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }

        setMoreOpen(true);
    };

    const blockHide = () => {
        if (!isDesktop) return;

        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
    };

    const closeMore = () => {
        if (!isDesktop) {
            setMoreOpen(false);
            return;
        }

        hideTimeoutRef.current = setTimeout(() => {
            setMoreOpen(false);
        }, 1000);
    };

    const handleLogout = () => {
        dispatch(logout());
    };
    const handleNavLinkClick = () => {
        if (!isDesktop) {
            setIsMenuOpen(false);
            setMoreOpen(false);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
        if (moreOpen) {
            setMoreOpen(false);
        }
    };

    return (
        <nav className={`navbar ${isHidden ? "hidden" : ""} ${isMenuOpen ? "navbar-open" : ""}`}>
            <div className="navbar-header">
                <Link to="/" className="nav-title" onClick={handleNavLinkClick}>
                    Vembo
                </Link>
                <button
                    type="button"
                    className={`navbar-toggle ${isMenuOpen ? "navbar-toggle-open" : ""}`}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                >
                    <span className="navbar-toggle-bar" />
                    <span className="navbar-toggle-bar" />
                    <span className="navbar-toggle-bar" />
                </button>
            </div>
            <div className={`nav-links ${isMenuOpen || isDesktop ? "nav-links-open" : ""}`}>
                <Link to="/" className={`nav-btn ${selectedPage === 0 ? "nav-btn-selected" : ""}`} onClick={handleNavLinkClick}>
                    <img className="nav-icon" src="/src/assets/icons/glacier.png" />
                    Learn
                </Link>
                <Link
                    to="/practice-hub"
                    className={`nav-btn ${selectedPage === 1 ? "nav-btn-selected" : ""}`}
                    onClick={handleNavLinkClick}
                >
                    <img className="nav-icon" src="/src/assets/icons/practice.png" />
                    Practice
                </Link>
                <Link
                    to="/leaderboards"
                    className={`nav-btn ${selectedPage === 2 ? "nav-btn-selected" : ""}`}
                    onClick={handleNavLinkClick}
                >
                    <img className="nav-icon" src="/src/assets/icons/leaderboards.png" />
                    Leaderboards
                </Link>
                <Link
                    to="/quests"
                    className={`nav-btn ${selectedPage === 3 ? "nav-btn-selected" : ""}`}
                    onClick={handleNavLinkClick}
                >
                    <img className="nav-icon" src="/src/assets/icons/chest.png" />
                    Quests
                </Link>
                <Link
                    to="/shop"
                    className={`nav-btn ${selectedPage === 4 ? "nav-btn-selected" : ""}`}
                    onClick={handleNavLinkClick}
                >
                    <img className="nav-icon" src="/src/assets/icons/shop.png" />
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
                    />
                    Profile
                </Link>

                <div
                    className={`nav-btn more-container ${moreOpen ? "more-container-open" : ""}`}
                    onMouseEnter={openMore}
                    onMouseLeave={closeMore}
                >
                    <button
                        type="button"
                        className="more-toggle"
                        onClick={(event) => {
                            event.stopPropagation();
                            openMore();
                        }}
                        aria-expanded={moreOpen}
                    >
                        <img className="nav-icon" src="/src/assets/icons/more.png" />
                        <span>More</span>
                    </button>

                    <div
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
    );
}
