import { Link } from "react-router-dom";
import { selectUserData } from "../../slices/authSlice";
import { useSelector } from "react-redux";
import type { NavbarComponent } from "../../types/componentTypes";
import { selectSelectedPage } from "../../slices/menuSlice";

export default function NavBar({ isHidden }: NavbarComponent) {
    const user = useSelector(selectUserData);
    const selectedPage = useSelector(selectSelectedPage);

    return (
        <nav className={`navbar ${isHidden ? "hidden" : ""}`}>
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
                to={`/profile/${user?.nickNameSlug}`}
                className={`nav-btn ${selectedPage === 5 ? "nav-btn-selected" : ""}`}
            >
                <img className="nav-icon" src="/src/assets/icons/profile_default_icon.png" />
                Profile
            </Link>
            <div className="nav-btn">
                <img className="nav-icon" src="/src/assets/icons/more.png" />
                More
            </div>
        </nav>
    );
}
