import { Link } from "react-router-dom";

export default function LegendaryLevel() {
    return (
        <div>
            <p>Prove your proficency with Legendary</p>

            <Link to="/lesson" className="play-btn">
                Practice +5 XP
            </Link>

            <Link to="/lesson" className="play-btn">
                Legendary +40 XP
            </Link>
        </div>
    );
}
