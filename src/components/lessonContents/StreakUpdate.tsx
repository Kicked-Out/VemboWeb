import type { StreakUpdateComponents } from "../../types/componentTypes";

export default function StreakUpdate({ streak, onNext }: StreakUpdateComponents) {
    const calendarDays = ["th", "f", "Sa", "Su", "M"];
    const lastStreak = 3;

    return (
        <div>
            <div className="streak-title">
                <h1 className="really-big-fucking-title">{streak}</h1>
                <p>day streak</p>
            </div>

            <div className="streak-calendar-block">
                <div className="streak-calendar">
                    {calendarDays.map((day, index) => (
                        <div className={index === 0 ? "streak-today" : "streak-day"}>
                            <p>{day}</p>
                        </div>
                    ))}
                </div>

                {streak === 2 && (
                    <div className="streak-description">
                        <p>You lost your {lastStreak} day streak.</p>
                    </div>
                )}
            </div>

            <div className="btn-bar align-right">
                <button className="primary-btn" onClick={onNext}>
                    Earn Streak
                </button>
            </div>
        </div>
    );
}
