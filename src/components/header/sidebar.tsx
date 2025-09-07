import type { SidebarComponent } from "../../types/componentTypes";
import StatisticCard from "../cards/sidebar/statisticCard";
import CardContainer from "../containers/cardContainers/cardContainer";

export default function Sidebar({ isHidden }: SidebarComponent) {
    return (
        <div className={`sidebar ${isHidden ? "hidden" : ""}`}>
            <StatisticCard />

            <CardContainer />
        </div>
    );
}
