import { useEffect, useState } from "react";
import type { QuestDTO } from "../../../DTOs/questDTO";
import type { QuestDefinitionDTO } from "../../../DTOs/questDefinitionDTO";
import type { UserQuestProgressDTO } from "../../../DTOs/userProgressDTO/userQuestProgressDTO";
import { QuestService } from "../../../services/questService";
import { QuestDefinitionService } from "../../../services/questDefinitionService";
import { UserQuestProgressService } from "../../../services/userProgress/userQuestProgressService";

export default function MonthlyQuestCard() {
    const monthlyQuestColors: string[][] = [
        ["#FFD500", "#FFB700", "#4D3900", "#f5faff"],
        ["#2EE6C3", "#28C9AD", "#0F3B30", "#f5faff"],
        ["#A259FF", "#8F2EFF", "#3F0A4D", "#f5faff"],
        ["#B4DEFF", "#79bfee", "#1E4D66", "#f5faff"],
        ["#FF7A00", "#eb4e00", "#4D1C00", "#f5faff"],
        ["#FFB84D", "#ec962b", "#4D290E", "#f5faff"],
        ["#2EC3B8", "#28AFA5", "#0E3935", "#f5faff"],
        ["#FF6B6B", "#eb4e00", "#4D0E0E", "#f5faff"],
        ["#A275FF", "#8B4BFF", "#3D0A4D", "#f5faff"],
        ["#F5FAFF", "#cedaf5", "#1E2B3D", "#1E2B3D"],
        ["#FFD57A", "#f3b440ff", "#4D2F0E", "#f5faff"],
        ["#2B90FF", "#007BFF", "#0A264D", "#f5faff"],
    ];

    const currentMonth = new Date().getMonth();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const currentYear = 2025;
    const monthDaysAmount: number[] = [31, currentYear % 4 === 0 ? 28 : 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const [monthlyQuest, setMonthlyQuest] = useState<QuestDTO | null>();
    const [monthlyQuestDefinition, setMonthlyQuestDefinition] = useState<QuestDefinitionDTO | null>();
    const [monthlyQuestTimeRemaining, setMonthlyQuestTimeRemaining] = useState<number>(0);
    const [monthlyQuestTimeRemainingInterval, setMonthlyQuestTimeRemainingInterval] = useState<string>("Days");
    const [monthlyUserQuestProgress, setMonthlyUserQuestProgress] = useState<UserQuestProgressDTO | null>();
    const [monthlyQuestProgress, setMonthlyQuestProgress] = useState<number>(0);

    useEffect(() => {
        const getCurrentMonthlyQuestAndQuestDefinition = async () => {
            const monthlyQuestData = await QuestService.getCurrentMonthly();

            if (!monthlyQuestData) return;

            setMonthlyQuest(monthlyQuestData);

            const monthlyQuestDefinitionData = await QuestDefinitionService.getById(monthlyQuestData.questDefinitionId);

            if (!monthlyQuestDefinitionData) return;

            setMonthlyQuestDefinition(monthlyQuestDefinitionData);

            const monthlyUserQuestProgressData = await UserQuestProgressService.getByQuestId(monthlyQuestData.id);

            if (!monthlyUserQuestProgressData) return;

            setMonthlyUserQuestProgress(monthlyUserQuestProgressData);

            const monthlyQuestProgressData =
                (100 / monthlyQuestDefinitionData.requirement) * monthlyUserQuestProgressData.progress;

            setMonthlyQuestProgress(monthlyQuestProgressData);
        };

        getCurrentMonthlyQuestAndQuestDefinition();
    }, []);

    useEffect(() => {
        if (!monthlyQuest) return;

        const calculateTimeRemaining = () => {
            const currentHours = new Date().getHours();
            const currentMinutes = new Date().getMinutes();

            const monthlyQuestStartDate = new Date(monthlyQuest.startDate);
            const monthlyQuestEndDate = new Date(monthlyQuest.endDate);

            const monthlyQuestStartDays = monthlyQuestStartDate.getDate();
            let monthlyQuestEndDays = monthlyQuestEndDate.getDate();

            if (monthlyQuestEndDays <= monthlyQuestStartDays) {
                monthlyQuestEndDays += monthDaysAmount[currentMonth];
            }

            const timeRemainingDays = monthlyQuestEndDays - monthlyQuestStartDays;
            const timeRemainingHours = 24 - currentHours;
            const timeRemainingMinutes = 60 - currentMinutes;
            const timeRemainingInterval =
                timeRemainingDays !== 1 ? "Days" : timeRemainingHours !== 0 ? "Hours" : "Minutes";
            const timeRemaining =
                timeRemainingDays !== 1
                    ? timeRemainingDays
                    : timeRemainingHours !== 0
                    ? timeRemainingHours
                    : timeRemainingMinutes;

            setMonthlyQuestTimeRemaining((prevTimeRemaining) => {
                if (prevTimeRemaining !== timeRemaining) {
                    return timeRemaining;
                }

                return prevTimeRemaining;
            });
            setMonthlyQuestTimeRemainingInterval(timeRemainingInterval);
        };

        calculateTimeRemaining();

        const interval = setInterval(() => {
            calculateTimeRemaining();
        }, 1000 * 60);

        return () => clearInterval(interval);
    }, [monthlyQuest]);

    return (
        <div className="monthly-quest-card" style={{ backgroundColor: monthlyQuestColors[currentMonth][0] }}>
            <div className="monthly-quest-card__content">
                <div className="month-title-block" style={{ backgroundColor: monthlyQuestColors[currentMonth][3] }}>
                    <h3 className="month-title" style={{ color: monthlyQuestColors[currentMonth][0] }}>
                        {months[currentMonth]}
                    </h3>
                </div>

                <div className="monthly-quest-card__info">
                    <h2 className="monthly-quest-card-title" style={{ color: monthlyQuestColors[currentMonth][2] }}>
                        {monthlyQuestDefinition ? monthlyQuestDefinition?.title : "Monthly Quest Title"}
                    </h2>

                    <div className="monthly-quest-card-time-remaining">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <circle
                                cx="11"
                                cy="11"
                                r="9"
                                stroke={monthlyQuestColors[currentMonth][2]}
                                stroke-width="4"
                            />
                            <path
                                d="M6.93945 6.93945C7.52524 6.35367 8.47476 6.35367 9.06055 6.93945L11.1484 9.02734C11.2634 9.01115 11.3806 9 11.5 9C12.8807 9.00006 14 10.1193 14 11.5C13.9999 12.8806 12.8806 13.9999 11.5 14C10.1193 14 9.00006 12.8807 9 11.5C9 11.3806 9.01115 11.2634 9.02734 11.1484L6.93945 9.06055C6.35367 8.47476 6.35367 7.52524 6.93945 6.93945Z"
                                fill={monthlyQuestColors[currentMonth][2]}
                            />
                        </svg>

                        <p
                            className="monthly-quest-card-time-remaining__title"
                            style={{ color: monthlyQuestColors[currentMonth][2] }}
                        >
                            {monthlyQuestTimeRemaining >= 0 ? monthlyQuestTimeRemaining : 0}{" "}
                            {monthlyQuestTimeRemainingInterval}
                        </p>
                    </div>
                </div>
            </div>

            <div className="monthly-quest-inner-card" style={{ backgroundColor: monthlyQuestColors[currentMonth][2] }}>
                <h2 className="monthly-quest-inner-card__title">
                    {monthlyQuestDefinition ? monthlyQuestDefinition?.description : "Monthly Quest Description"}
                </h2>

                <div
                    className="monthly-quest-inner-card__progress-container"
                    style={{ backgroundColor: monthlyQuestColors[currentMonth][1] }}
                >
                    <div className="monthly-quest-inner-card__progress-field">
                        <div
                            className="monthly-quest-inner-card__progress"
                            style={{
                                backgroundColor: monthlyQuestColors[currentMonth][0],
                                width: `${monthlyQuestProgress}%`,
                                borderTopLeftRadius: 300,
                                borderBottomLeftRadius: 300,
                                borderTopRightRadius: monthlyQuestProgress === 100 ? 300 : 0,
                                borderBottomRightRadius: monthlyQuestProgress === 100 ? 300 : 0,
                            }}
                        ></div>

                        <p
                            className="monthly-quest-inner-card__progress-info"
                            style={{ color: monthlyQuestColors[currentMonth][3] }}
                        >
                            {monthlyUserQuestProgress?.progress}/{monthlyQuestDefinition?.requirement}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
