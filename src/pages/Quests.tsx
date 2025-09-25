import { useDispatch, useSelector } from "react-redux";
import {
    hideAdBlockerCard,
    hideDailyQuestCard,
    hideInsightCard,
    hideLeaderboardCard,
    hideWhatAreLeaderboardsCard,
    selectFirstLevelStatus,
    setIsSidebarLoaded,
    setPage,
    showInfoCard,
    showMonthlyBadgesCard,
    showNavbar,
    showSidebar,
} from "../slices/menuSlice";
import { useEffect } from "react";
import LockedQuestContent from "../components/questContents/lockedQuestContent";
import QuestContent from "../components/questContents/questContent";

export default function Quests() {
    const dispatch = useDispatch();
    const firstLevelStatus = useSelector(selectFirstLevelStatus);

    useEffect(() => {
        dispatch(showNavbar());
        dispatch(setPage({ selectedPage: 3 }));
        dispatch(showSidebar());
        dispatch(setIsSidebarLoaded(false));
        dispatch(hideInsightCard());
        dispatch(hideLeaderboardCard());
        dispatch(hideDailyQuestCard());
        dispatch(hideAdBlockerCard());
        dispatch(hideWhatAreLeaderboardsCard());
        dispatch(showMonthlyBadgesCard());
        dispatch(showInfoCard());
    }, []);

    return firstLevelStatus === 1 ? <LockedQuestContent /> : <QuestContent />;
}
