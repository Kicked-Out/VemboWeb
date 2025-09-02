export default function InactiveLeaderboardCard() {
    return (
        <div className="leaderboard-card">
            <h2 className="leaderboard-card__title">Daily Challenge</h2>

            <div className="leaderboard-inactive-card__content">
                <img
                    className="leaderboard-inactive-card__img"
                    src="/src/assets/icons/leaderboards/leaderboard-inactive-badge.png"
                />

                <p className="leaderboard-card__info">Complete 9 lessons to start competing</p>
            </div>
        </div>
    );
}
