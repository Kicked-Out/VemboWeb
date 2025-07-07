import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="navbar">
            <div>
                <Link to="/">Vembo</Link>
            </div>
            <div>
                <Link to="/">Learn</Link>
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
                <Link to="/profile">Profile</Link>
            </div>
            <div>
                <Link to="/more">More</Link>
            </div>
        </nav>
    );
}
