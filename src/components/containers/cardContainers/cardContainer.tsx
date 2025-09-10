import InsightCard from "../../cards/sidebar/insightCard";
import InactiveLeaderboardCard from "../../cards/sidebar/inactiveLeaderboardCard";
import LeaderboardCard from "../../cards/sidebar/leaderboardCard";
import DailyQuestsCard from "../../cards/sidebar/dailyQuestsCard";
import AdBlockerCard from "../../cards/sidebar/adblockerCard";
import InfoCard from "../../cards/sidebar/infoCard";
import { useSelector } from "react-redux";
import { selectStreak } from "../../../slices/userStatisticsSlice";
import {
    selectIsAdBlockerCardHidden,
    selectIsDailyQuestCardHidden,
    selectIsInfoCardHidden,
    selectIsInsightCardHidden,
    selectIsLeaderboardCardHidden,
    selectIsWhatAreLeaderboardsCardHidden,
} from "../../../slices/menuSlice";
import WhatAreLeaderboardsCard from "../../cards/sidebar/whatAreLeaderBoards";

export default function CardContainer() {
    const streak = useSelector(selectStreak);
    const isInsightCardHidden = useSelector(selectIsInsightCardHidden);
    const isLeaderboardCardHidden = useSelector(selectIsLeaderboardCardHidden);
    const isDailyQuestCardHidden = useSelector(selectIsDailyQuestCardHidden);
    const isAdBlockerCardHidden = useSelector(selectIsAdBlockerCardHidden);
    const isWhatAreLeaderboardCardHidden = useSelector(selectIsWhatAreLeaderboardsCardHidden);
    const isInfoCardHidden = useSelector(selectIsInfoCardHidden);

    return (
        <div className="card-container">
            {!isInsightCardHidden ? <InsightCard /> : null}

            {!isLeaderboardCardHidden ? streak == 0 ? <InactiveLeaderboardCard /> : <LeaderboardCard /> : null}

            {!isDailyQuestCardHidden ? <DailyQuestsCard /> : null}
            {!isAdBlockerCardHidden ? <AdBlockerCard /> : null}
            {!isWhatAreLeaderboardCardHidden ? <WhatAreLeaderboardsCard /> : null}

            {!isInfoCardHidden ? <InfoCard /> : null}
        </div>
    );
}
