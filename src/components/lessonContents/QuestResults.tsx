import type { QuestResultsComponents } from "../../types/componentTypes";

export default function QuestResults({ questsCompleted, onNext }: QuestResultsComponents) {
    return (
        <div>
            <h2>
                {questsCompleted === 0 ? "No" : `{questsCompleted}`} Daily Quest
                {questsCompleted > 1 || (questsCompleted === 0 && "s")} compplete!
            </h2>

            <div className="quests">
                <div className="quest">
                    <img className="quest-icon" />

                    <div className="quest-content">
                        <p className="quest-title">Earn 30 XP</p>
                        <div className="progress-bar">
                            <div className="progress"></div>
                        </div>
                    </div>
                </div>

                <div className="quest">
                    <img className="quest-icon" />

                    <div className="quest-content">
                        <p className="quest-title">Spend 10 minutes learning</p>
                        <div className="progress-bar">
                            <div className="progress"></div>
                        </div>
                    </div>
                </div>

                <div className="quest">
                    <img className="quest-icon" />

                    <div className="quest-content">
                        <p className="quest-title">Earn 20 Combo Bonus XP</p>
                        <div className="progress-bar">
                            <div className="progress"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="btn-bar align-right">
                <button className="primary-btn" onClick={onNext}>
                    Continue
                </button>
            </div>
        </div>
    );
}
