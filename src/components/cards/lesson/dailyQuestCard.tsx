import type { DailyQuestCardComponent } from "../../../types/componentTypes";

export default function DailyQuestCard({
    type,
    title,
    progress,
    currentValue,
    targetValue,
    chestLevel,
}: DailyQuestCardComponent) {
    return (
        <div className="daily-quest-card">
            <img className="daily-quest-card__img" src={`src/assets/icons/daily_quests/${type}.png`} />

            <div className="daily-quest-card__content">
                <h3 className="daily-quest-card__title">{title}</h3>

                <div className="daily-quest-card__progress-container">
                    <div className="daily-quest-card__progress-field" style={{ ["--progress" as any]: `${progress}%` }}>
                        <div className="daily-quest__progress"></div>

                        <p className="daily-quest-card__progress-info daily-quest-card__progress-info--empty">
                            {currentValue}/{targetValue}
                        </p>

                        <p className="daily-quest-card__progress-info daily-quest-card__progress-info--filled">
                            {currentValue}/{targetValue}
                        </p>
                    </div>

                    <img
                        className="daily-quest-card__reward-img"
                        src={`/src/assets/icons/daily_quests/reward_chest${chestLevel}.png`}
                    />
                </div>
            </div>
        </div>
    );
}
