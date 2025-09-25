import { useEffect, useState } from "react";
import DailyQuestCard from "../cards/lesson/dailyQuestCard";
import type { QuestDefinitionDTO } from "../../DTOs/questDefinitionDTO";
import { QuestService } from "../../services/questService";
import { QuestDefinitionService } from "../../services/questDefinitionService";
import { useDispatch } from "react-redux";
import { setIsSidebarLoaded } from "../../slices/menuSlice";

export default function LockedQuestContent() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [dailyQuestDefinitions, setDailyQuestDefinition] = useState<QuestDefinitionDTO[]>([]);
    const [dailyQuestTimeRemaining, setDailyQuestTimeRemaining] = useState<number>(0);
    const [dailyQuestTimeRemainingInterval, setDailyQuestTimeRemainingInterval] = useState<string>("Hours");

    useEffect(() => {
        dispatch(setIsSidebarLoaded(true));
    }, []);

    useEffect(() => {
        const calculateTimeRemaining = () => {
            const currentHour = new Date().getHours();
            const currentMinute = new Date().getMinutes();

            const timeRemainingHours = 24 - currentHour;
            const timeRemainingMinutes = 60 - currentMinute;
            const timeRemainingInterval = timeRemainingHours !== 0 ? "Hours" : "Minutes";
            const timeRemaining = timeRemainingHours !== 0 ? timeRemainingHours : timeRemainingMinutes;

            setDailyQuestTimeRemaining((prevTimeRemaining) => {
                if (prevTimeRemaining !== timeRemaining) {
                    return timeRemaining;
                }

                return prevTimeRemaining;
            });

            setDailyQuestTimeRemainingInterval(timeRemainingInterval);
        };

        calculateTimeRemaining();

        const interval = setInterval(() => {
            calculateTimeRemaining();
        }, 1000 * 60);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const getDailyQuestsData = async () => {
            const dailyQuestsData = await QuestService.getCurrentDaily();

            if (!dailyQuestsData) return;

            const dailyQuestsDefinitionData = await Promise.all(
                dailyQuestsData.map((dailyQuestData) =>
                    QuestDefinitionService.getById(dailyQuestData.questDefinitionId)
                )
            );

            if (!dailyQuestsDefinitionData) return;

            setDailyQuestDefinition(dailyQuestsDefinitionData.filter(Boolean) as QuestDefinitionDTO[]);

            setIsLoaded(true);
        };

        getDailyQuestsData();
    }, []);

    return (
        <div className={`locked-quests ${isLoaded ? "fade-in" : "fade-out"}`}>
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
                        <h3 className="daily-quests-time-remaining__title">
                            {dailyQuestTimeRemaining} {dailyQuestTimeRemainingInterval}
                        </h3>
                    </div>
                </div>

                <div className="daily-quests-block">
                    <DailyQuestCard
                        type={dailyQuestDefinitions[0]?.requirementType}
                        title={dailyQuestDefinitions[0]?.title}
                        progress={0}
                        currentValue={0}
                        targetValue={dailyQuestDefinitions[0]?.requirement}
                        chestLevel={1}
                    />

                    <div className="locked-daily-quest-card">
                        <img className="locked-daily-quest-card__icon" src="/src/assets/icons/quests/locked/lock.png" />

                        <h5 className="locked-daily-quest-card__title">More quests unlock soon</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}
