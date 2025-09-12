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
            <div className="lesson-complete-title-block">
                <img
                    className="lesson-complete-icon"
                    src="/src/assets/icons/lesson/complete/lesson-complete-icon.png"
                />
                <h3 className="lesson-complete-title">Lesson Complete</h3>
                {/* <p>You made no mistakes in this lesson.</p> */}
            </div>

            <div className="summary-items">
                <div className="summary-item totalxp-summary-color">
                    <h5 className="summary-title">Total XP</h5>
                    <div className="summary-result-block">
                        <img className="summary-result-icon" src="/src/assets/icons/lesson/complete/totalxp_icon.png" />
                        <p className="summary-result-title totalxp-result-title-color">{data.totalXP}</p>
                    </div>
                </div>

                <div className="summary-item accuracy-summary-color">
                    <h5 className="summary-title">Great!</h5>
                    <div className="summary-result-block">
                        <img
                            className="summary-result-icon"
                            src="/src/assets/icons/lesson/complete/accuracy_icon.png"
                        />
                        <p className="summary-result-title accuracy-result-title-color">{data.accuracy}%</p>
                    </div>
                </div>
            </div>

            <div className="lesson-complete-btn-block">
                <button className="lesson-complete-btn" onClick={completeLevelHandle}>
                    Continue
                </button>
            </div>
        </div>
    );
}
