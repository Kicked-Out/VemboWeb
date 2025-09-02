export default function DailyQuestsCard() {
    return (
        <div className="daily-quests-card">
            <div className="daily-quests-card__block">
                <div className="daily-quests-card__content">
                    <h2 className="daily-quests-card__title">Daily Quests</h2>
                    <a className="daily-quests-card__view-all">View All</a>
                </div>

                <div className="daily-quests-container">
                    <div className="daily-quest">
                        <img className="daily-quest__img" src="src/assets/icons/daily_quests/lightning.png" />

                        <div className="daily-quest__content">
                            <h3 className="daily-quest__title">Earn 10 XP</h3>

                            <div className="daily-quest__progress-container">
                                <div className="daily-quest__progress-field">
                                    <div className="daily-quest__progress"></div>
                                    <p className="daily-quest__progress-info">10/10</p>
                                </div>

                                <img
                                    className="daily-quest__reward-img"
                                    src="src/assets/icons/daily_quests/reward_chest.png"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="daily-quest">
                        <img className="daily-quest__img" src="src/assets/icons/daily_quests/time.png" />

                        <div className="daily-quest__content">
                            <h3 className="daily-quest__title">Spend 5 minutes learning</h3>

                            <div className="daily-quest__progress-container">
                                <div className="daily-quest__progress-field">
                                    <div className="daily-quest__progress"></div>
                                    <p className="daily-quest__progress-info">2/5</p>
                                </div>

                                <img
                                    className="daily-quest__reward-img"
                                    src="src/assets/icons/daily_quests/reward_chest2.png"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="daily-quest">
                        <img className="daily-quest__img" src="src/assets/icons/daily_quests/goal.png" />

                        <div className="daily-quest__content">
                            <h3 className="daily-quest__title">Complete 3 perfect lessons</h3>

                            <div className="daily-quest__progress-container">
                                <div className="daily-quest__progress-field">
                                    <div className="daily-quest__progress"></div>
                                    <p className="daily-quest__progress-info">1/3</p>
                                </div>

                                <img
                                    className="daily-quest__reward-img"
                                    src="src/assets/icons/daily_quests/reward_chest2.png"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
