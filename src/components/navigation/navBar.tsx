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
        setMoreOpen(false);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className={`navbar ${isHidden ? "hidden" : ""}`} onClick={closeMoreImmediately}>
            <Link to="/" className="nav-title">
                Vembo
            </Link>
            <Link to="/" className={`nav-btn ${selectedPage === 0 ? "nav-btn-selected" : ""}`}>
                <img className="nav-icon" src="/src/assets/icons/glacier.png" />
                Learn
            </Link>
            <Link to="/practice-hub" className={`nav-btn ${selectedPage === 1 ? "nav-btn-selected" : ""}`}>
                <img className="nav-icon" src="/src/assets/icons/practice.png" />
                Practice
            </Link>
            <Link to="/leaderboards" className={`nav-btn ${selectedPage === 2 ? "nav-btn-selected" : ""}`}>
                <img className="nav-icon" src="/src/assets/icons/leaderboards.png" />
                Leaderboards
            </Link>
            <Link to="/quests" className={`nav-btn ${selectedPage === 3 ? "nav-btn-selected" : ""}`}>
                <img className="nav-icon" src="/src/assets/icons/chest.png" />
                Quests
            </Link>
            <Link to="/shop" className={`nav-btn ${selectedPage === 4 ? "nav-btn-selected" : ""}`}>
                <img className="nav-icon" src="/src/assets/icons/shop.png" />
                Shop
            </Link>
            <Link
                to={`/profile/${user?.nickName}`}
                className={`nav-btn ${selectedPage === 5 ? "nav-btn-selected" : ""}`}
            >
                <img
                    className="nav-profile-icon"
                    src={user?.avatarUrl ? user?.avatarUrl : "/src/assets/icons/profile_default_icon.png"}
                />
                Profile
            </Link>

            <div className="nav-btn more-container" onMouseEnter={openMore} onMouseLeave={closeMore}>
                <div className="more-toggle">
                    <img className="nav-icon" src="/src/assets/icons/more.png" />
                    <span>More</span>
                </div>

                <div
                    className={`more-menu ${moreOpen ? "more-menu-open" : "more-menu-closed"}`}
                    onMouseEnter={blockHide}
                    role="menu"
                    aria-hidden={!moreOpen}
                >
                    <Link to="/settings" className="more-menu-item" onClick={closeMoreImmediately}>
                        Settings
                    </Link>

                    <div
                        className="more-menu-item"
                        onClick={() => {
                            handleLogout();
                            closeMoreImmediately();
                        }}
                    >
                        Log out
                    </div>

                    <Link to="/help" className="more-menu-item" onClick={closeMoreImmediately}>
                        Help
                    </Link>
                </div>
            </div>
        </nav>
    );
}
