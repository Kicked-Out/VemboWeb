import type { RewardComponents } from "../../types/componentTypes";

export default function Reward({ reward, rewardType, onNext }: RewardComponents) {
    return (
        <div className="reward-container">
            <img className="reward-icon" src={`/src/assets/icons/lesson/complete/${rewardType}_reward.png`} />
            <h2 className="reward-title">
                You earned {reward} {rewardType}!
            </h2>
            <p className="reward-description">Complete Daily Quests every day to earn more rewards!</p>

            <div className="lesson-complete-btn-block">
                <button className="lesson-complete-btn" onClick={onNext}>
                    Continue
                </button>
            </div>
        </div>
    );
}
