import { useState } from "react";
import type { GoalPromptComponents } from "../../types/componentTypes";

export default function GoalPrompt({ onNext }: GoalPromptComponents) {
    const [chance, setChance] = useState<number>(1);

    return (
        <div>
            <div className="vembo-comment">
                You'll be <span className="gold">{chance}x more</span> likely to complete the course!
            </div>

            <img />

            <div className="goals">
                <div className="goal">
                    <p className="goal-title">7 day streak</p>
                    <p className="goal-desc">Good</p>
                </div>

                <div className="goal">
                    <p className="goal-title">14 day streak</p>
                    <p className="goal-desc">Great</p>
                </div>

                <div className="goal">
                    <p className="goal-title">30 day streak</p>
                    <p className="goal-desc">Incredible</p>
                </div>

                <div className="goal">
                    <p className="goal-title">50 day streak</p>
                    <p className="goal-desc">Unstoppable</p>
                </div>
            </div>

            <div className="btn-bar align-right">
                <button className="primary-btn" onClick={onNext}>
                    I can do it!
                </button>
            </div>
        </div>
    );
}
