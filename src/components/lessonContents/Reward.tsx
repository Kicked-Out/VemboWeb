import type { RewardComponents } from "../../types/componentTypes";

export default function Reward({ reward, rewardType, onNext }: RewardComponents) {
    return (
        <div>
            <img className="reward-icon" />
            <h2 className="reward-title">
                You earned {reward} {rewardType}!
            </h2>
            <p className="reward-description">Complete Daily Quests every day to earn more rewards!</p>

            <div className="btn-bar align-right">
                <button className="primary-btn" onClick={onNext}>
                    Continue
                </button>
            </div>
        </div>
    );
}
