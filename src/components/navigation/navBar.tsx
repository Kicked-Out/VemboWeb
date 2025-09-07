import { Link } from "react-router-dom";
import { selectUserData } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { NavbarComponent } from "../../types/componentTypes";
import { selectSelectedPage, setPage } from "../../slices/menuSlice";

export default function NavBar({ isHidden }: NavbarComponent) {
    const dispatch = useDispatch();
    const user = useSelector(selectUserData);
    const selectedPage = useSelector(selectSelectedPage);

    const updatePage = (index: number) => {
        dispatch(setPage({ selectedPage: index }));
    };

    return (
        <nav className={`navbar ${isHidden ? "hidden" : ""}`}>
            <Link to="/" className="nav-title">
                Vembo
            </Link>
            <Link
                to="/"
                className={`nav-btn ${selectedPage === 0 ? "nav-btn-selected" : ""}`}
                onClick={() => updatePage(0)}
            >
                <img className="nav-icon" src="src/assets/icons/glacier.png" />
                Learn
            </Link>
            <Link
                to="/practice"
                className={`nav-btn ${selectedPage === 1 ? "nav-btn-selected" : ""}`}
                onClick={() => updatePage(1)}
            >
                <img className="nav-icon" src="src/assets/icons/practice.png" />
                Practice
            </Link>
            <Link
                to="/leaderboards"
                className={`nav-btn ${selectedPage === 2 ? "nav-btn-selected" : ""}`}
                onClick={() => updatePage(2)}
            >
                <img className="nav-icon" src="src/assets/icons/leaderboards.png" />
                Leaderboards
            </Link>
            <Link
                to="/quests"
                className={`nav-btn ${selectedPage === 3 ? "nav-btn-selected" : ""}`}
                onClick={() => updatePage(3)}
            >
                <img className="nav-icon" src="src/assets/icons/chest.png" />
                Quests
            </Link>
            <Link
                to="/shop"
                className={`nav-btn ${selectedPage === 4 ? "nav-btn-selected" : ""}`}
                onClick={() => updatePage(4)}
            >
                <img className="nav-icon" src="src/assets/icons/shop.png" />
                Shop
            </Link>
            <Link
                to={`/profile/${user?.nickNameSlug}`}
                className={`nav-btn ${selectedPage === 5 ? "nav-btn-selected" : ""}`}
                onClick={() => updatePage(5)}
            >
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
