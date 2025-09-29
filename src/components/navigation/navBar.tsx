import { useEffect, useRef, useState, type MouseEvent } from "react";
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

    const toggleMobileMenu = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setIsMobileMenuOpen((prev) => !prev);
    };

    const closeAllMenus = () => {
        closeMoreImmediately();
        setIsMobileMenuOpen(false);
    };

    const toggleMoreMenu = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();

        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }

        setMoreOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <nav
            className={`navbar ${isHidden ? "hidden" : ""} ${isMobileMenuOpen ? "navbar-mobile-open" : ""}`}
            onClick={closeMoreImmediately}
        >
            <div className="nav-header">
                <Link to="/" className="nav-title" onClick={closeAllMenus}>
                    Vembo
                </Link>

                <button
                    className="nav-mobile-toggle"
                    type="button"
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="navbar-menu"
                    aria-label="Toggle navigation menu"
                    onClick={toggleMobileMenu}
                >
                    <span className="nav-mobile-toggle__bar" />
                    <span className="nav-mobile-toggle__bar" />
                    <span className="nav-mobile-toggle__bar" />
                </button>
            </div>

            <div id="navbar-menu" className="nav-links">
                <Link to="/" className={`nav-btn ${selectedPage === 0 ? "nav-btn-selected" : ""}`} onClick={closeAllMenus}>
                    <img className="nav-icon" src="/src/assets/icons/glacier.png" />
                    Learn
                </Link>
                <Link
                    to="/practice-hub"
                    className={`nav-btn ${selectedPage === 1 ? "nav-btn-selected" : ""}`}
                    onClick={closeAllMenus}
                >
                    <img className="nav-icon" src="/src/assets/icons/practice.png" />
                    Practice
                </Link>
                <Link
                    to="/leaderboards"
                    className={`nav-btn ${selectedPage === 2 ? "nav-btn-selected" : ""}`}
                    onClick={closeAllMenus}
                >
                    <img className="nav-icon" src="/src/assets/icons/leaderboards.png" />
                    Leaderboards
                </Link>
                <Link
                    to="/quests"
                    className={`nav-btn ${selectedPage === 3 ? "nav-btn-selected" : ""}`}
                    onClick={closeAllMenus}
                >
                    <img className="nav-icon" src="/src/assets/icons/chest.png" />
                    Quests
                </Link>
                <Link
                    to="/shop"
                    className={`nav-btn ${selectedPage === 4 ? "nav-btn-selected" : ""}`}
                    onClick={closeAllMenus}
                >
                    <img className="nav-icon" src="/src/assets/icons/shop.png" />
                    Shop
                </Link>
                <Link
                    to={`/profile/${user?.nickName}`}
                    className={`nav-btn ${selectedPage === 5 ? "nav-btn-selected" : ""}`}
                    onClick={closeAllMenus}
                >
                    <img
                        className="nav-profile-icon"
                        src={user?.avatarUrl ? user?.avatarUrl : "/src/assets/icons/profile_default_icon.png"}
                    />
                    Profile
                </Link>

                <div
                    className="nav-btn more-container"
                    onMouseEnter={openMore}
                    onMouseLeave={closeMore}
                    onClick={(event) => event.stopPropagation()}
                >
                    <div className="more-toggle" onClick={toggleMoreMenu}>
                        <img className="nav-icon" src="/src/assets/icons/more.png" />
                        <span>More</span>
                    </div>

                    <div
                        className={`more-menu ${moreOpen ? "more-menu-open" : "more-menu-closed"}`}
                        onMouseEnter={blockHide}
                        onClick={(event) => event.stopPropagation()}
                        role="menu"
                        aria-hidden={!moreOpen}
                    >
                        <Link to="/settings" className="more-menu-item" onClick={closeAllMenus}>
                            Settings
                        </Link>

                        <div
                            className="more-menu-item"
                            onClick={() => {
                                handleLogout();
                                closeAllMenus();
                            }}
                        >
                            Log out
                        </div>

                        <Link to="/help" className="more-menu-item" onClick={closeAllMenus}>
                            Help
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
