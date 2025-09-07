import { useDispatch } from "react-redux";
import type { ProgressSummaryComponents } from "../../types/componentTypes";
import { addStreak } from "../../slices/userStatisticsSlice";
import {
    setChestStatus,
    setFirstAchievementInfo,
    setFirstLevelStatus,
    setSecondAchievementInfo,
    setThirdAchievementInfo,
} from "../../slices/menuSlice";

export default function ProgressSummary({ data, onNext }: ProgressSummaryComponents) {
    const dispatch = useDispatch();

    const completeLevelHandle = () => {
        dispatch(setFirstLevelStatus({ firstLevelStatus: 2 }));
        dispatch(setChestStatus({ chestStatus: 1 }));
        dispatch(addStreak());

        dispatch(setFirstAchievementInfo({ firstAchievementInfo: 10 }));
        dispatch(setSecondAchievementInfo({ secondAchievementInfo: 3 }));
        dispatch(setThirdAchievementInfo({ thirdAchievementInfo: 1 }));

        onNext();
    };

    return (
        <div>
            <div className="titleBlock">
                <h3>Perfect Lesson</h3>
                <p>You made no mistakes in this lesson.</p>
            </div>

            <div className="flex items">
                <div>
                    <p>{data.totalXP}</p>
                    <span>Total XP</span>
                </div>

                <div className="item">
                    <p>{data.accuracy}</p>
                    <span>Accuracy</span>
                </div>
            </div>

            <div className="bottom-bar align-right">
                <button className="primary-btn" onClick={completeLevelHandle}>
                    Continue
                </button>
            </div>
        </div>
    );
}
