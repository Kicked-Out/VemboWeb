import StatisticCard from "../cards/sidebar/StatisticCard";
import CardContainer from "../containers/cardContainers/cardContainer";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <StatisticCard />

            <CardContainer />
        </div>
    );
}
