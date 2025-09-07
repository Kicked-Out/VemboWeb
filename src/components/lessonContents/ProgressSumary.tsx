import { useDispatch } from "react-redux";
import type { ProgressSummaryComponents } from "../../types/componentTypes";
import { addStreak } from "../../slices/userStatisticsSlice";
import {
    setChestStatus,
    setFirstQuestInfo,
    setFirstLevelStatus,
    setSecondQuestInfo,
    setThirdQuestInfo,
} from "../../slices/menuSlice";

export default function ProgressSummary({ data, onNext }: ProgressSummaryComponents) {
    const dispatch = useDispatch();

    const completeLevelHandle = () => {
        dispatch(setFirstLevelStatus({ firstLevelStatus: 2 }));
        dispatch(setChestStatus({ chestStatus: 1 }));
        dispatch(addStreak());

        dispatch(setFirstQuestInfo({ firstQuestInfo: 10 }));
        dispatch(setSecondQuestInfo({ secondQuestInfo: 3 }));
        dispatch(setThirdQuestInfo({ thirdQuestInfo: 1 }));

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
