import { useEffect, useState } from "react";
import DailyQuest from "../../cardContents/dailyQuest";
import type { QuestDefinitionDTO } from "../../../DTOs/questDefinitionDTO";
import type { UserQuestProgressDTO } from "../../../DTOs/userProgressDTO/userQuestProgressDTO";
import { QuestService } from "../../../services/questService";
import { QuestDefinitionService } from "../../../services/questDefinitionService";
import { UserQuestProgressService } from "../../../services/userProgress/userQuestProgressService";
import { useDispatch, useSelector } from "react-redux";
import { selectIsSidebarLoaded, setIsSidebarLoaded } from "../../../slices/menuSlice";
import { selectUserStatistics } from "../../../slices/selectors";
import { UserPeriodProgressService } from "../../../services/userProgress/userPeriodProgressService";

export default function DailyQuestsContainer() {
    const isLoaded = useSelector(selectIsSidebarLoaded);
    const userStats = useSelector(selectUserStatistics);
    const [dailyQuestDefinitions, setDailyQuestDefinitions] = useState<QuestDefinitionDTO[]>([]);
    const [userDailyQuestProgresses, setUserDailyQuestProgresses] = useState<UserQuestProgressDTO[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userStats) return;
        if (userStats.currentPeriodId === 0) return;
        if (isLoaded) return;

        const getDailyQuestsData = async () => {
            const userPeriodProgress = await UserPeriodProgressService.getByPeriodId(userStats.currentPeriodId);

            if (!userPeriodProgress) return;

            const totalXp = userPeriodProgress.xp;

            const dailyQuestsData = await QuestService.getCurrentDaily();

            if (!dailyQuestsData) return;

            const dailyQuestsDefinitionData = await Promise.all(
                dailyQuestsData.map((dailyQuestData) =>
                    QuestDefinitionService.getById(dailyQuestData.questDefinitionId)
                )
            );

            const dailyQuestsDefinitionList =
                totalXp > 0 ? dailyQuestsDefinitionData : dailyQuestsDefinitionData.slice(0, 1);

            if (!dailyQuestsDefinitionList) return;

            setDailyQuestDefinitions(dailyQuestsDefinitionList.filter(Boolean) as QuestDefinitionDTO[]);

            const userDailyQuestProgressData = await Promise.all(
                dailyQuestsData.map((dailyQuestData) => UserQuestProgressService.getByQuestId(dailyQuestData.id))
            );

            if (!userDailyQuestProgressData) return;

            setUserDailyQuestProgresses(userDailyQuestProgressData.filter(Boolean) as UserQuestProgressDTO[]);

            dispatch(setIsSidebarLoaded(true));
        };

        getDailyQuestsData();
    }, [isLoaded, userStats]);

    return (
        <div className="daily-quests-container">
            {dailyQuestDefinitions.map((dailyQuestDefinition, index) => {
                const userDailyQuestProgress = userDailyQuestProgresses[index];
                let dailyQuestProgress =
                    (100 / dailyQuestDefinition.requirement) *
                    (userDailyQuestProgress ? userDailyQuestProgress.progress : 0);

                if (dailyQuestProgress === 100) {
                    dailyQuestProgress = 104;
                }

                return (
                    <DailyQuest
                        key={index}
                        type={dailyQuestDefinition.requirementType}
                        title={dailyQuestDefinition.title}
                        progress={dailyQuestProgress}
                        minValue={userDailyQuestProgress?.progress}
                        maxValue={dailyQuestDefinition.requirement}
                        chestLevel={index + 1}
                    />
                );
            })}
        </div>
    );
}
