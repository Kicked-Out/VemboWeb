import { useDispatch, useSelector } from "react-redux";
import {
    hideAdBlockerCard,
    hideDailyQuestCard,
    hideInsightCard,
    hideLeaderboardCard,
    hideWhatAreLeaderboardsCard,
    selectFirstLevelStatus,
    showInfoCard,
    showMonthlyBadgesCard,
    showNavbar,
    showSidebar,
} from "../slices/menuSlice";
import DailyQuestCard from "../components/cards/lesson/dailyQuestCard";
import { useEffect } from "react";

export default function Quests() {
    const dispatch = useDispatch();
    const firstLevelStatus = useSelector(selectFirstLevelStatus);

    useEffect(() => {
        dispatch(showNavbar());
        dispatch(showSidebar());
        dispatch(hideInsightCard());
        dispatch(hideLeaderboardCard());
        dispatch(hideDailyQuestCard());
        dispatch(hideAdBlockerCard());
        dispatch(hideWhatAreLeaderboardsCard());
        dispatch(showMonthlyBadgesCard());
        dispatch(showInfoCard());
    }, []);

    return firstLevelStatus === 1 ? (
        <div className="locked-quests">
            <div className="welcome-quests-card">
                <div className="welcome-quests-card__info">
                    <h1 className="welcome-quests-card__title">Welcome!</h1>
                    <p className="welcome-quests-card__description">
                        Complete quests to earn rewards! Quests refresh every day.
                    </p>
                </div>

                <img
                    className="welcome-quests-card__img"
                    src="/src/assets/icons/quests/welcome_quests_card/welcome_quests_card_img.png"
                />
            </div>

            <div className="daily-quests-container">
                <div className="daily-quests-container__title-block">
                    <h2 className="daily-quests-container__title">Daily Quests</h2>

                    <div className="daily-quests-time-remaining">
                        <img
                            className="daily-quests-time-remaining__icon"
                            src="/src/assets/icons/quests/daily_quests_time_remaining_icon.png"
                        />
                        <h3 className="daily-quests-time-remaining__title">24 hours</h3>
                    </div>
                </div>

                <div className="daily-quests-block">
                    <DailyQuestCard
                        icon="/src/assets/icons/daily_quests/lightning.png"
                        title="Earn 10 XP"
                        progress={0}
                        currentValue={0}
                        targetValue={10}
                        chestLevel={1}
                    />

                    <div className="locked-daily-quest-card">
                        <img className="locked-daily-quest-card__icon" src="/src/assets/icons/quests/locked/lock.png" />

                        <h5 className="locked-daily-quest-card__title">More quests unlock soon</h5>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="quests">
            <div className="monthly-quest-card"></div>
        </div>
    );
}
