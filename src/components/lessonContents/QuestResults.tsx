import { useSelector } from "react-redux";
import type { QuestResultsComponents } from "../../types/componentTypes";
import { selectFirstQuestInfo, selectSecondQuestInfo, selectThirdQuestInfo } from "../../slices/menuSlice";
import DailyQuestCard from "../cards/lesson/dailyQuestCard";

export default function QuestResults({ questsCompleted, onNext }: QuestResultsComponents) {
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
        <div className="daily-quest-container">
            <h2 className="daily-quest-title">
                {questsCompleted === 0 ? "No" : `${questsCompleted}`} Daily Quest
                {questsCompleted > 1 || (questsCompleted === 0 && "s")} complete!
            </h2>

            <div className="daily-quests">
                <DailyQuestCard
                    icon={firstQuestIcon}
                    title="Earn 10 XP"
                    progress={
                        (100 / firstTargetValue) * firstQuestInfo === 100
                            ? 104
                            : (100 / firstTargetValue) * firstQuestInfo
                    }
                    currentValue={firstQuestInfo}
                    targetValue={firstTargetValue}
                    chestLevel={1}
                />

                <DailyQuestCard
                    icon={secondQuestIcon}
                    title="Spend 5 minutes learning"
                    progress={
                        (100 / secondTargetValue) * secondQuestInfo === 100
                            ? 104
                            : (100 / secondTargetValue) * secondQuestInfo
                    }
                    currentValue={secondQuestInfo}
                    targetValue={secondTargetValue}
                    chestLevel={1}
                />

                <DailyQuestCard
                    icon={thirdQuestIcon}
                    title="Complete 3 perfect lessons"
                    progress={
                        (100 / thirdTargetValue) * thirdQuestInfo === 100
                            ? 104
                            : (100 / thirdTargetValue) * thirdQuestInfo
                    }
                    currentValue={thirdQuestInfo}
                    targetValue={thirdTargetValue}
                    chestLevel={1}
                />
            </div>

            <div className="lesson-complete-btn-block">
                <button className="lesson-complete-btn" onClick={onNext}>
                    Continue
                </button>
            </div>
        </div>
    );
}
