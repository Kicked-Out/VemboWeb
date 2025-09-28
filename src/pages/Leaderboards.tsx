import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    hideAdBlockerCard,
    hideDailyQuestCard,
    hideInfoCard,
    hideInsightCard,
    hideLeaderboardCard,
    hideMonthlyBadgesCard,
    hideSidebar,
    hideStatisticCard,
    selectFirstLevelStatus,
    setIsSidebarLoaded,
    setPage,
    showNavbar,
    showSidebar,
    showWhatAreLeaderboardsCard,
} from "../slices/menuSlice";
import LeaderboardsContent from "../components/leaderboardContents/leaderboardsContent";
import LockedLeaderboards from "../components/leaderboardContents/lockedLeaderboards";

export default function Leaderboards() {
    const dispatch = useDispatch();
    const isFirstLevelStatus = useSelector(selectFirstLevelStatus);

    useEffect(() => {
        dispatch(showNavbar());
        dispatch(setPage({ selectedPage: 2 }));

        if (isFirstLevelStatus === 1) {
            dispatch(showSidebar());
            dispatch(setIsSidebarLoaded(false));
            dispatch(hideStatisticCard());
            dispatch(hideInsightCard());
            dispatch(hideLeaderboardCard());
            dispatch(hideDailyQuestCard());
            dispatch(hideAdBlockerCard());
            dispatch(showWhatAreLeaderboardsCard());
            dispatch(hideMonthlyBadgesCard());
            dispatch(hideInfoCard());
        } else {
            dispatch(hideSidebar());
        }
    }, [isFirstLevelStatus]);

    return isFirstLevelStatus === 1 ? <LockedLeaderboards /> : <LeaderboardsContent />;
}
