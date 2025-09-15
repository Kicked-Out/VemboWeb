import type { ProgressSummaryComponents } from "../../types/componentTypes";

export default function ProgressSummary({ data, onNext }: ProgressSummaryComponents) {
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
                <button className="primary-btn" onClick={onNext}>
                    Continue
                </button>
            </div>
        </div>
    );
}
