import { useSelector } from "react-redux";
import DailyQuest from "../../cardContents/dailyQuest";
import { selectFirstQuestInfo, selectSecondQuestInfo, selectThirdQuestInfo } from "../../../slices/menuSlice";

export default function DailyQuestsContainer() {
    const firstQuestIcon = "/src/assets/icons/daily_quests/lightning.png";
    const secondQuestIcon = "/src/assets/icons/daily_quests/time.png";
    const thirdQuestIcon = "/src/assets/icons/daily_quests/goal.png";

    const firstQuestInfo = useSelector(selectFirstQuestInfo);
    const secondQuestInfo = useSelector(selectSecondQuestInfo);
    const thirdQuestInfo = useSelector(selectThirdQuestInfo);

    const firstTargetValue = 10;
    const secondTargetValue = 5;
    const thirdTargetValue = 3;

    return (
        <div className="daily-quests-container">
            <DailyQuest
                icon={firstQuestIcon}
                title="Earn 10 XP"
                progress={(100 / firstTargetValue) * firstQuestInfo}
                minValue={firstQuestInfo}
                maxValue={firstTargetValue}
                chestLevel={1}
            />

            <DailyQuest
                icon={secondQuestIcon}
                title="Spend 5 minutes learning"
                progress={(100 / secondTargetValue) * secondQuestInfo}
                minValue={secondQuestInfo}
                maxValue={secondTargetValue}
                chestLevel={2}
            />

            <DailyQuest
                icon={thirdQuestIcon}
                title="Complete 3 perfect lessons"
                progress={(100 / thirdTargetValue) * thirdQuestInfo}
                minValue={thirdQuestInfo}
                maxValue={thirdTargetValue}
                chestLevel={3}
            />
        </div>
    );
}
