import { Link } from "react-router-dom";
import { selectUserData } from "../../slices/authSlice";
import { useSelector } from "react-redux";

export default function NavBar() {
    const user = useSelector(selectUserData);

    return (
        <nav className="navbar">
            <div>
                <Link to="/">Vembo</Link>
            </div>
            <div>
                <Link to="/">Learn</Link>
            </div>
            <div>
                <Link to="/practice">Peactice</Link>
            </div>
            <div>
                <Link to="/leaderboards">Leaderboards</Link>
            </div>
            <div>
                <Link to="/quests">Quests</Link>
            </div>
            <div>
                <Link to="/shop">Shop</Link>
            </div>
            <div>
                <Link to={`/profile/${user?.nickNameSlug}`}>Profile</Link>
            </div>
            <div>
                <Link to="/more">More</Link>
            </div>
        </nav>
    );
}
