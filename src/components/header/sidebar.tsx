import { useSelector } from "react-redux";
import type { SidebarComponent } from "../../types/componentTypes";
import StatisticCard from "../cards/sidebar/statisticCard";
import CardContainer from "../containers/cardContainers/cardContainer";
import { selectIsStatisticCardHidden } from "../../slices/menuSlice";

export default function Sidebar({ isHidden }: SidebarComponent) {
    const isStatisticCardHidden = useSelector(selectIsStatisticCardHidden);

    return (
        <div className={`sidebar-top ${isHidden ? "hidden" : ""}`}>
            <div className="sidebar">
                {!isStatisticCardHidden ? <StatisticCard /> : null}

                <CardContainer />
            </div>
        </div>
    );
}
