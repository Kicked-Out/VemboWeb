import type { QuestResultsComponents } from "../../types/componentTypes";
import DailyQuestCard from "../cards/lesson/dailyQuestCard";
import { useEffect, useState } from "react";
import { QuestService } from "../../services/questService";
import { QuestDefinitionService } from "../../services/questDefinitionService";
import { UserQuestProgressService } from "../../services/userProgress/userQuestProgressService";
import type { QuestDefinitionDTO } from "../../DTOs/questDefinitionDTO";
import type { UserQuestProgressDTO } from "../../DTOs/userProgressDTO/userQuestProgressDTO";

export default function QuestResults({ questsCompleted, onNext }: QuestResultsComponents) {
    const [dailyQuestDefinitions, setDailyQuestDefinitions] = useState<QuestDefinitionDTO[]>([]);
    const [userDailyQuestProgresses, setUserDailyQuestProgresses] = useState<UserQuestProgressDTO[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

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

            setDailyQuestDefinitions(dailyQuestsDefinitionData.filter(Boolean) as QuestDefinitionDTO[]);

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
        <div className={`daily-quest-container ${isLoaded ? "fade-in" : "fade-out"}`}>
            <h2 className="daily-quest-title">
                {questsCompleted === 0 ? "No" : `${questsCompleted}`} Daily Quest
                {questsCompleted > 1 || (questsCompleted === 0 && "s")} complete!
            </h2>

            <div className="daily-quests">
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
                            key={index}
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

            <div className="lesson-complete-btn-block">
                <button className="lesson-complete-btn" onClick={onNext}>
                    Continue
                </button>
            </div>
        </div>
    );
}
