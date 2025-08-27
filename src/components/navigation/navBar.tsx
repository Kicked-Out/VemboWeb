import { Link } from "react-router-dom";
import { selectUserData } from "../../slices/authSlice";
import { useSelector } from "react-redux";

export default function NavBar() {
    const user = useSelector(selectUserData);

    return (
        <nav className="navbar">
            <Link to="/" className="nav-title">
                Vembo
            </Link>
            <Link to="/" className="nav-btn">
                <img className="nav-icon" src="src/assets/icons/glacier.png" />
                Learn
            </Link>
            <Link to="/practice" className="nav-btn">
                <img className="nav-icon" src="src/assets/icons/practice.png" />
                Practice
            </Link>
            <Link to="/leaderboards" className="nav-btn">
                <img className="nav-icon" src="src/assets/icons/leaderboards.png" />
                Leaderboards
            </Link>
            <Link to="/quests" className="nav-btn">
                <img className="nav-icon" src="src/assets/icons/chest.png" />
                Quests
            </Link>
            <Link to="/shop" className="nav-btn">
                <img className="nav-icon" src="src/assets/icons/shop.png" />
                Shop
            </Link>
            <Link to={`/profile/${user?.nickNameSlug}`} className="nav-btn">
                <img className="nav-icon" src="src/assets/icons/icon.png" />
                Profile
            </Link>
            <div className="nav-btn">
                <img className="nav-icon" src="src/assets/icons/more.png" />
                More
            </div>
        </nav>
    );
}
