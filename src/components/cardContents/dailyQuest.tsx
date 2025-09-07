import type { DailyQuestComponent } from "../../types/componentTypes";

export default function DailyQuest({ title, progress, minValue, maxValue, chestLevel }: DailyQuestComponent) {
    return (
        <div className="daily-quest">
            <img className="daily-quest__img" src="src/assets/icons/daily_quests/lightning.png" />

            <div className="daily-quest__content">
                <h3 className="daily-quest__title">{title}</h3>

                <div className="daily-quest__progress-container">
                    <div className="daily-quest__progress-field" style={{ ["--progress" as any]: `${progress}%` }}>
                        <div className="daily-quest__progress"></div>

                        <p className="daily-quest__progress-info daily-quest__progress-info--empty">
                            {minValue}/{maxValue}
                        </p>

                        <p className="daily-quest__progress-info daily-quest__progress-info--filled">
                            {minValue}/{maxValue}
                        </p>
                    </div>

                    <img
                        className="daily-quest__reward-img"
                        src={`src/assets/icons/daily_quests/reward_chest${chestLevel}.png`}
                    />
                </div>
            </div>
        </div>
    );
}
