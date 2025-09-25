import { useEffect, useState } from "react";
import type { QuestDefinitionDTO } from "../../../DTOs/questDefinitionDTO";
import type { UserQuestProgressDTO } from "../../../DTOs/userProgressDTO/userQuestProgressDTO";
import { QuestService } from "../../../services/questService";
import { QuestDefinitionService } from "../../../services/questDefinitionService";
import { UserQuestProgressService } from "../../../services/userProgress/userQuestProgressService";
import DailyQuestCard from "../lesson/dailyQuestCard";
import type { DailyQuestCardBlocksContainerComponent } from "../../../types/componentTypes";

export default function DailyQuestBlocksContainer({ setIsLoaded }: DailyQuestCardBlocksContainerComponent) {
    const [dailyQuestDefinitions, setDailyQuestDefinition] = useState<QuestDefinitionDTO[]>([]);
    const [userDailyQuestProgresses, setUserDailyQuestProgresses] = useState<UserQuestProgressDTO[]>([]);
    const [dailyQuestTimeRemaining, setDailyQuestTimeRemaining] = useState<number>(0);
    const [dailyQuestTimeRemainingInterval, setDailyQuestTimeRemainingInterval] = useState<string>("Hours");

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

            const userDailyQuestProgressData = await Promise.all(
                dailyQuestsData.map((dailyQuestData) => UserQuestProgressService.getByQuestId(dailyQuestData.id))
            );

            if (!userDailyQuestProgressData) return;

            setUserDailyQuestProgresses(userDailyQuestProgressData.filter(Boolean) as UserQuestProgressDTO[]);

            setIsLoaded(true);
        };

        getDailyQuestsData();
    }, []);

    return (
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

            <div className="daily-quests-block-connected">
                {dailyQuestDefinitions.map((dailyQuestDefinition, index) => {
                    const userDailyQuestProgress = userDailyQuestProgresses[index];
                    let dailyQuestProgress =
                        (100 / dailyQuestDefinition.requirement) *
                        (userDailyQuestProgress ? userDailyQuestProgress.progress : 0);

                    if (dailyQuestProgress === 100) {
                        dailyQuestProgress = 104;
                    }

                    return (
                        <DailyQuestCard
                            type={dailyQuestDefinition.requirementType}
                            title={dailyQuestDefinition.title}
                            progress={dailyQuestProgress}
                            currentValue={userDailyQuestProgress?.progress}
                            targetValue={dailyQuestDefinition.requirement}
                            chestLevel={index + 1}
                        />
                    );
                })}
            </div>
        </div>
    );
}
