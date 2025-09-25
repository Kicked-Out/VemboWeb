import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { QuestDTO } from "../../../DTOs/questDTO";
import type { QuestDefinitionDTO } from "../../../DTOs/questDefinitionDTO";
import { QuestService } from "../../../services/questService";
import { QuestDefinitionService } from "../../../services/questDefinitionService";
import type { MedalDTO } from "../../../DTOs/medalDTO";
import { MedalService } from "../../../services/medalService";
import { UserQuestProgressService } from "../../../services/userProgress/userQuestProgressService";
import { useDispatch, useSelector } from "react-redux";
import { selectIsSidebarLoaded, setIsSidebarLoaded } from "../../../slices/menuSlice";

export default function MonthlyBadgesCard() {
    const [monthlyQuests, setMonthlyQuests] = useState<QuestDTO[]>([]);
    const [monthlyQuestsDefinitions, setMonthlyQuestDefinitions] = useState<QuestDefinitionDTO[]>([]);
    const [monthlyQuestMedals, setMonthlyQuestMedals] = useState<MedalDTO[]>([]);
    const dispatch = useDispatch();
    const isLoaded = useSelector(selectIsSidebarLoaded);

    useEffect(() => {
        if (isLoaded) return;

        const getMonthlyQuestQuestDefinitionsAndMedals = async () => {
            const monthlyQuestData = await QuestService.getAllMonthly();

            if (!monthlyQuestData) return;

            const userMonthlyQuestProgressData = await Promise.all(
                monthlyQuestData.map((monthlyQuest) => UserQuestProgressService.getByQuestId(monthlyQuest.id))
            );

            const completedUserMonthlyQuests = monthlyQuestData.filter((monthlyQuest) =>
                userMonthlyQuestProgressData.some(
                    (userMonthlyQuestProgress) =>
                        userMonthlyQuestProgress?.questId === monthlyQuest.id &&
                        userMonthlyQuestProgress?.isCompleted === true
                )
            );

            setMonthlyQuests(completedUserMonthlyQuests);

            const monthlyQuestDefinitionsData = await Promise.all(
                completedUserMonthlyQuests.map((monthlyQuest) => QuestDefinitionService.getById(monthlyQuest.id))
            );

            if (!monthlyQuestDefinitionsData) return;

            setMonthlyQuestDefinitions(monthlyQuestDefinitionsData.filter(Boolean) as QuestDefinitionDTO[]);

            const monthlyQuestMedalsData = await Promise.all(
                completedUserMonthlyQuests.map((monthlyQuest) => MedalService.getById(monthlyQuest.medalId))
            );

            if (!monthlyQuestMedalsData) return;

            setMonthlyQuestMedals(monthlyQuestMedalsData.filter(Boolean) as MedalDTO[]);

            dispatch(setIsSidebarLoaded(true));
        };

        getMonthlyQuestQuestDefinitionsAndMedals();
    }, [isLoaded]);

    return (
        <div className="monthly-badges-card">
            <div className="monthly-badges-card__title-block">
                <h3 className="monthly-badges-card__title">Monthly Badges</h3>

                <Link to="/quests/badges" className="monthly-badges-card__link">
                    View all
                </Link>
            </div>

            <div className="monthly-badges">
                {monthlyQuests.map((monthlyQuest) => {
                    const monthlyQuestDefinition = monthlyQuestsDefinitions.find(
                        (monthlyQuestDefinition) => monthlyQuestDefinition.id === monthlyQuest.questDefinitionId
                    );
                    const monthlyQuestMedal = monthlyQuestMedals.find(
                        (monthlyQuestMedal) => monthlyQuestMedal.id === monthlyQuest.medalId
                    );

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

                    const monthlyQuestDate = new Date(monthlyQuest.startDate);
                    const monthlyQuestMonthIndex = monthlyQuestDate.getMonth();
                    const monthlyQuestMonth = months[monthlyQuestMonthIndex];
                    const monthlyQuestYear = monthlyQuestDate.getFullYear();

                    return (
                        <div className="monthly-badge">
                            <img className="monthly-badge__icon" src={monthlyQuestMedal?.imageUrl} />

                            <div className="monthly-badge__info">
                                <h4 className="monthly-badge__title">{monthlyQuestDefinition?.title}</h4>
                                <p className="monthly-badge__date">
                                    {monthlyQuestMonth} {monthlyQuestYear}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
