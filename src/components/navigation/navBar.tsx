import { useEffect, useState } from "react";
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
    const dispatch = useDispatch();

    const openMore = () => {
        setMoreOpen(true);
    };

    const closeMore = () => {
        setMoreOpen(false);
    };

    const closeMoreImmediately = () => {
        setMoreOpen(false);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const toggleMenu = () => {
        if (isMenuOpen) {
            setMoreOpen(false);
        }

        setIsMenuOpen((prev) => !prev);
    };

    const handleNavClick = () => {
        setIsMenuOpen(false);
        closeMoreImmediately();
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.setProperty("overflow", "hidden");
        } else {
            document.body.style.removeProperty("overflow");
        }

        return () => {
            document.body.style.removeProperty("overflow");
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (typeof window === "undefined") return;

            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
                setMoreOpen(false);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <nav className={`navbar ${isHidden ? "navbar--hidden" : ""}`}>
            <div className="navbar__inner">
                <Link to="/" className="nav-title" onClick={handleNavClick}>
                    Vembo
                </Link>
                <button
                    type="button"
                    className={`nav__toggle ${isMenuOpen ? "nav__toggle--open" : ""}`}
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen}
                    aria-controls="nav-links"
                >
                    <span className="sr-only">Toggle navigation</span>
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </button>
            </div>

            <div id="nav-links" className={`nav-links ${isMenuOpen ? "nav-links--open" : ""}`}>
                <Link to="/" className={`nav-btn ${selectedPage === 0 ? "nav-btn-selected" : ""}`} onClick={handleNavClick}>
                    <img className="nav-icon" src="/src/assets/icons/glacier.png" alt="Learn" loading="lazy" />
                    Learn
                </Link>
                <Link
                    to="/practice-hub"
                    className={`nav-btn ${selectedPage === 1 ? "nav-btn-selected" : ""}`}
                    onClick={handleNavClick}
                >
                    <img className="nav-icon" src="/src/assets/icons/practice.png" alt="Practice" loading="lazy" />
                    Practice
                </Link>
                <Link
                    to="/leaderboards"
                    className={`nav-btn ${selectedPage === 2 ? "nav-btn-selected" : ""}`}
                    onClick={handleNavClick}
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
                    onClick={handleNavClick}
                >
                    <img className="nav-icon" src="/src/assets/icons/chest.png" alt="Quests" loading="lazy" />
                    Quests
                </Link>
                <Link
                    to="/shop"
                    className={`nav-btn ${selectedPage === 4 ? "nav-btn-selected" : ""}`}
                    onClick={handleNavClick}
                >
                    <img className="nav-icon" src="/src/assets/icons/shop.png" alt="Shop" loading="lazy" />
                    Shop
                </Link>
                <Link
                    to={`/profile/${user?.nickName}`}
                    className={`nav-btn ${selectedPage === 5 ? "nav-btn-selected" : ""}`}
                    onClick={handleNavClick}
                >
                    <img
                        className="nav-profile-icon"
                        src={user?.avatarUrl ? user?.avatarUrl : "/src/assets/icons/profile_default_icon.png"}
                        alt="Profile"
                        loading="lazy"
                    />
                    Profile
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
                            setMoreOpen((prev) => !prev);
                        }}
                        aria-expanded={moreOpen}
                        aria-controls="more-menu"
                    >
                        <img className="nav-icon" src="/src/assets/icons/more.png" alt="More" loading="lazy" />
                        <span>More</span>
                    </button>

                    <div
                        id="more-menu"
                        className={`more-menu ${moreOpen ? "more-menu-open" : "more-menu-closed"}`}
                        role="menu"
                        aria-hidden={!moreOpen}
                    >
                        <Link to="/settings" className="more-menu-item" onClick={handleNavClick}>
                            Settings
                        </Link>

                        <button
                            type="button"
                            className="more-menu-item"
                            onClick={() => {
                                handleLogout();
                                handleNavClick();
                            }}
                        >
                            Log out
                        </button>

                        <Link to="/help" className="more-menu-item" onClick={handleNavClick}>
                            Help
                        </Link>
                    </div>
                </div>
            </div>
            {isMenuOpen && <div className="nav__overlay" onClick={toggleMenu} aria-hidden="true" />}
        </nav>
    );
}
