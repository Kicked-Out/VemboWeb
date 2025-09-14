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
            <div className="monthly-quest-card">
                <div className="monthly-quest-card__content">
                    <div className="month-title-block">
                        <h3 className="month-title">September</h3>
                    </div>

                    <div className="monthly-quest-card__info">
                        <h2 className="monthly-quest-card-title">Lin's Speedy Ride</h2>

                        <div className="monthly-quest-card-time-remaining">
                            <img
                                className="monthly-quest-card-time-remaining__icon"
                                src="/src/assets/icons/quests/monthly_quest_time_remaining_icon.png"
                            />

                            <p className="monthly-quest-card-time-remaining__title">13 days</p>
                        </div>
                    </div>
                </div>

                <div className="monthly-quest-inner-card">
                    <h2 className="monthly-quest-inner-card__title">Complete 25 quests</h2>

                    <div className="monthly-quest-inner-card__progress-container">
                        <div className="monthly-quest-inner-card__progress-field">
                            <div className="monthly-quest-inner-card__progress"></div>

                            <p className="monthly-quest-inner-card__progress-info">1/25</p>
                        </div>
                    </div>
                </div>
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

                <div className="daily-quests-block-connected">
                    <DailyQuestCard
                        icon="/src/assets/icons/daily_quests/lightning.png"
                        title="Earn 10 XP"
                        progress={104}
                        currentValue={10}
                        targetValue={10}
                        chestLevel={1}
                    />

                    <DailyQuestCard
                        icon="/src/assets/icons/daily_quests/time.png"
                        title="Spend 5 minutes learning"
                        progress={40}
                        currentValue={2}
                        targetValue={5}
                        chestLevel={2}
                    />

                    <DailyQuestCard
                        icon="/src/assets/icons/daily_quests/goal.png"
                        title="Complete 3 perfect lessons"
                        progress={33}
                        currentValue={1}
                        targetValue={3}
                        chestLevel={3}
                    />
                </div>
            </div>
        </div>
    );
}
