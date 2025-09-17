import { Link } from "react-router-dom";

export default function MonthlyBadgesCard() {
    return (
        <div className="monthly-badges-card">
            <div className="monthly-badges-card__title-block">
                <h3 className="monthly-badges-card__title">Monthly Badges</h3>

                <Link to="/quests/badges" className="monthly-badges-card__link">
                    View all
                </Link>
            </div>

            <div className="monthly-badges">
                <div className="monthly-badge">
                    <img
                        className="monthly-badge__icon"
                        src={`/src/assets/icons/quests/monthly_badges/monthly_badge${1}_icon.png`}
                    />

                    <div className="monthly-badge__info">
                        <h4 className="monthly-badge__title">Vembo's Spring Holidays</h4>
                        <p className="monthly-badge__date">April 2025</p>
                    </div>
                </div>

                <div className="monthly-badge">
                    <img
                        className="monthly-badge__icon"
                        src={`/src/assets/icons/quests/monthly_badges/monthly_badge${2}_icon.png`}
                    />

                    <div className="monthly-badge__info">
                        <h4 className="monthly-badge__title">Vembo's Frozen Winter</h4>
                        <p className="monthly-badge__date">December 2024</p>
                    </div>
                </div>

                <div className="monthly-badge">
                    <img
                        className="monthly-badge__icon"
                        src={`/src/assets/icons/quests/monthly_badges/monthly_badge${3}_icon.png`}
                    />

                    <div className="monthly-badge__info">
                        <h4 className="monthly-badge__title">Halloween Adventures</h4>
                        <p className="monthly-badge__date">October 2024</p>
                    </div>
                </div>

                <div className="monthly-badge">
                    <img
                        className="monthly-badge__icon"
                        src={`/src/assets/icons/quests/monthly_badges/monthly_badge${4}_icon.png`}
                    />

                    <div className="monthly-badge__info">
                        <h4 className="monthly-badge__title">2024 Summer Olympics</h4>
                        <p className="monthly-badge__date">August 2024</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
