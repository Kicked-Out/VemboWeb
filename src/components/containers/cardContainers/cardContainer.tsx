import InsightCard from "../../cards/sidebar/insightCard";
import InactiveLeaderboardCard from "../../cards/sidebar/inactiveLeaderboardCard";
import LeaderboardCard from "../../cards/sidebar/leaderboardCard";
import DailyQuestsCard from "../../cards/sidebar/dailyQuestsCard";
import AdBlockerCard from "../../cards/sidebar/adblockerCard";
import InfoCard from "../../cards/sidebar/infoCard";
import { useSelector } from "react-redux";
import { selectStreak } from "../../../slices/userStatisticsSlice";

export default function CardContainer() {
    const streak = useSelector(selectStreak);

    return (
        <div className="card-container">
            <InsightCard />

            {streak == 0 ? <InactiveLeaderboardCard /> : <LeaderboardCard />}

            <DailyQuestsCard />
            <AdBlockerCard />
            <InfoCard />
        </div>
    );
}
