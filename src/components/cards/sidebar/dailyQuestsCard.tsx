import { Link } from "react-router-dom";
import DailyQuestsContainer from "../../containers/cardContainers/dailyQuestsContainer";

export default function DailyQuestsCard() {
    return (
        <div className="daily-quests-card">
            <div className="daily-quests-card__block">
                <div className="daily-quests-card__content">
                    <h2 className="daily-quests-card__title">Daily Quests</h2>
                    <Link to="/quests" className="daily-quests-card__view-all">
                        View All
                    </Link>
                </div>

                <DailyQuestsContainer />
            </div>
        </div>
    );
}
