import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { logout, selectUserData } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { NavbarComponent } from "../../types/componentTypes";
import { selectSelectedPage } from "../../slices/menuSlice";

export default function NavBar({ isHidden, isMobileLayout = false }: NavbarComponent) {
    const user = useSelector(selectUserData);
    const selectedPage = useSelector(selectSelectedPage);

    const [moreOpen, setMoreOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isMobileLayout) {
            setIsDrawerOpen(false);
        }
    }, [isMobileLayout]);

    const openMore = () => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }

        setMoreOpen(true);
    };

    const toggleMore = () => {
        setMoreOpen((prev) => !prev);
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

    const handleDrawerToggle = () => {
        if (!isMobileLayout) return;

        setIsDrawerOpen((prev) => !prev);
        setMoreOpen(false);
    };

    const handleDrawerClose = () => {
        if (!isMobileLayout) return;

        setIsDrawerOpen(false);
        setMoreOpen(false);
    };

    const handleNavInteraction = () => {
        if (isMobileLayout) {
            handleDrawerClose();
        } else {
            closeMoreImmediately();
        }
    };

    return (
        <>
            <nav
                id="vembo-navigation"
                className={`navbar ${isHidden ? "hidden" : ""} ${isMobileLayout ? "navbar-drawer" : ""} ${
                    isMobileLayout && isDrawerOpen ? "navbar-drawer-open" : ""
                }`}
                onClick={!isMobileLayout ? closeMoreImmediately : undefined}
                aria-hidden={isMobileLayout ? !isDrawerOpen : undefined}
            >
                <div className="navbar-scrollable">
                    <Link to="/" className="nav-title" onClick={handleNavInteraction}>
                        Vembo
                    </Link>
                    <Link
                        to="/"
                        className={`nav-btn ${selectedPage === 0 ? "nav-btn-selected" : ""}`}
                        onClick={handleNavInteraction}
                    >
                        <img className="nav-icon" src="/src/assets/icons/glacier.png" />
                        Learn
                    </Link>
                    <Link
                        to="/practice-hub"
                        className={`nav-btn ${selectedPage === 1 ? "nav-btn-selected" : ""}`}
                        onClick={handleNavInteraction}
                    >
                        <img className="nav-icon" src="/src/assets/icons/practice.png" />
                        Practice
                    </Link>
                    <Link
                        to="/leaderboards"
                        className={`nav-btn ${selectedPage === 2 ? "nav-btn-selected" : ""}`}
                        onClick={handleNavInteraction}
                    >
                        <img className="nav-icon" src="/src/assets/icons/leaderboards.png" />
                        Leaderboards
                    </Link>
                    <Link
                        to="/quests"
                        className={`nav-btn ${selectedPage === 3 ? "nav-btn-selected" : ""}`}
                        onClick={handleNavInteraction}
                    >
                        <img className="nav-icon" src="/src/assets/icons/chest.png" />
                        Quests
                    </Link>
                    <Link
                        to="/shop"
                        className={`nav-btn ${selectedPage === 4 ? "nav-btn-selected" : ""}`}
                        onClick={handleNavInteraction}
                    >
                        <img className="nav-icon" src="/src/assets/icons/shop.png" />
                        Shop
                    </Link>
                    <Link
                        to={`/profile/${user?.nickName}`}
                        className={`nav-btn ${selectedPage === 5 ? "nav-btn-selected" : ""}`}
                        onClick={handleNavInteraction}
                    >
                        <img
                            className="nav-profile-icon"
                            src={user?.avatarUrl ? user?.avatarUrl : "/src/assets/icons/profile_default_icon.png"}
                        />
                        Profile
                    </Link>

                    <div
                        className="nav-btn more-container"
                        onMouseEnter={!isMobileLayout ? openMore : undefined}
                        onMouseLeave={!isMobileLayout ? closeMore : undefined}
                    >
                        <button
                            type="button"
                            className="more-toggle"
                            onClick={isMobileLayout ? toggleMore : undefined}
                            aria-expanded={moreOpen}
                            aria-haspopup="true"
                        >
                            <img className="nav-icon" src="/src/assets/icons/more.png" />
                            <span>More</span>
                        </button>

                        <div
                            className={`more-menu ${moreOpen ? "more-menu-open" : "more-menu-closed"}`}
                            onMouseEnter={!isMobileLayout ? blockHide : undefined}
                            role="menu"
                            aria-hidden={!moreOpen}
                        >
                            <Link to="/settings" className="more-menu-item" onClick={handleNavInteraction}>
                                Settings
                            </Link>

                            <button
                                type="button"
                                className="more-menu-item"
                                onClick={() => {
                                    handleLogout();
                                    handleNavInteraction();
                                }}
                            >
                                Log out
                            </button>

                            <Link to="/help" className="more-menu-item" onClick={handleNavInteraction}>
                                Help
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {isMobileLayout ? (
                <>
                    <button
                        type="button"
                        className={`navbar-toggle ${isDrawerOpen ? "navbar-toggle-open" : ""}`}
                        onClick={handleDrawerToggle}
                        aria-expanded={isDrawerOpen}
                        aria-controls="vembo-navigation"
                        aria-label={isDrawerOpen ? "Close navigation" : "Open navigation"}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                    {isDrawerOpen ? <div className="navbar-overlay" onClick={handleDrawerClose} /> : null}
                </>
            ) : null}
        </>
    );
}
