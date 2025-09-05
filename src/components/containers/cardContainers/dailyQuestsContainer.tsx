import { useSelector } from "react-redux";
import DailyQuest from "../../cardContents/dailyQuest";
import {
    selectFirstAchievementInfo,
    selectSecondAchievementInfo,
    selectThirdAchievementInfo,
} from "../../../slices/menuSlice";

export default function DailyQuestsContainer() {
    const firstAchievementInfo = useSelector(selectFirstAchievementInfo);
    const secondAchievementInfo = useSelector(selectSecondAchievementInfo);
    const thirdAchievementInfo = useSelector(selectThirdAchievementInfo);

    const firstTargetValue = 10;
    const secondTargetValue = 5;
    const thirdTargetValue = 3;

    return (
        <div className="daily-quests-container">
            <DailyQuest
                title="Earn 10 XP"
                progress={(100 / firstTargetValue) * firstAchievementInfo}
                minValue={firstAchievementInfo}
                maxValue={firstTargetValue}
                chestLevel={1}
            />

            <DailyQuest
                title="Spend 5 minutes learning"
                progress={(100 / secondTargetValue) * secondAchievementInfo}
                minValue={secondAchievementInfo}
                maxValue={secondTargetValue}
                chestLevel={2}
            />

            <DailyQuest
                title="Complete 3 perfect lessons"
                progress={(100 / thirdTargetValue) * thirdAchievementInfo}
                minValue={thirdAchievementInfo}
                maxValue={thirdTargetValue}
                chestLevel={3}
            />
        </div>
    );
}
