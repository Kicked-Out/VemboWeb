import { useNavigate } from "react-router-dom";

export default function LeaderboardCard() {
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate("/leaderboards");
    };

    return (
        <div className="leaderboard-card">
            <div className="leaderboard-card__block">
                <div className="leaderboard-card__content">
                    <h3 className="leaderboard-card__league-title">Ice League</h3>

                    <h2 className="leaderboard-card__title">
                        You're Ranked
                        <span className="leaderboard-card__rank"> #12</span>
                    </h2>

                    <p className="leaderboard-card__info">You've earned 113 XP this week so far</p>
                </div>

                <img
                    className="leaderboard-card__badge-img"
                    src="/src/assets/icons/leaderboards/ice_league_badge.png"
                />
            </div>

            <button className="leaderboard-card__btn" onClick={onClickHandler}>
                Go To Leaderboards
            </button>
        </div>
    );
}
