import { Link } from "react-router-dom";

export default function CompletedLevel() {
    return (
        <div>
            <p>You completed this level!</p>
            <Link to="/lesson" className="play-btn">
                Practice +5 XP
            </Link>
        </div>
    );
}
