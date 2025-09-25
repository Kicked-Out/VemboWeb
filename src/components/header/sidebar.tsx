import { useSelector } from "react-redux";
import type { SidebarComponent } from "../../types/componentTypes";
import StatisticCard from "../cards/sidebar/statisticCard";
import CardContainer from "../containers/cardContainers/cardContainer";
import { selectIsSidebarLoaded, selectIsStatisticCardHidden } from "../../slices/menuSlice";

export default function Sidebar({ isHidden }: SidebarComponent) {
    const isStatisticCardHidden = useSelector(selectIsStatisticCardHidden);
    const isLoaded = useSelector(selectIsSidebarLoaded);

    return (
        <div className={`sidebar-top ${isHidden ? "hidden" : ""}`}>
            <div className={`sidebar ${isLoaded ? "fade-in" : "fade-out"}`}>
                {!isStatisticCardHidden ? <StatisticCard /> : null}

                <CardContainer />
            </div>
        </div>
    );
}
