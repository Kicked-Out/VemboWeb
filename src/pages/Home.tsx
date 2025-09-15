import { useEffect, useState } from "react";
import UnitContainer from "../components/containers/unitContainer";
import type { UserPeriodProgressDTO } from "../DTOs/userProgressDTO/userPeriodProgressDTO";
import { UserPeriodProgressService } from "../services/userProgress/userPeriodProgressService";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPeriodId } from "../slices/userStatisticsSlice";
// import { useNavigate } from "react-router-dom";
// import AuthService from "../services/authService";
import UnitHeaderCard from "../components/cards/unitHeaderCard";
import type { UnitDTO } from "../DTOs/unitDTO";
import {
    hideMonthlyBadgesCard,
    hideWhatAreLeaderboardsCard,
    setPage,
    showAdBlockerCard,
    showDailyQuestCard,
    showInfoCard,
    showInsightCard,
    showLeaderboardCard,
    showNavbar,
    showSidebar,
    showStatisticCard,
} from "../slices/menuSlice";

export default function Home() {
    const dispatch = useDispatch();
    const [currentTopicOrder, setCurrentTopicOrder] = useState<number>(1);
    const [currentUnit, setCurrentUnit] = useState<UnitDTO | null>(null);

    const currentPeriodId = useSelector(selectCurrentPeriodId);
    const [userPeriodProgress, setUserPeriodProgress] = useState<UserPeriodProgressDTO | null>();

    useEffect(() => {
        dispatch(showNavbar());
        dispatch(setPage({ selectedPage: 0 }));
        dispatch(showSidebar());
        dispatch(showStatisticCard());
        dispatch(showInsightCard());
        dispatch(showLeaderboardCard());
        dispatch(showDailyQuestCard());
        dispatch(showAdBlockerCard());
        dispatch(hideWhatAreLeaderboardsCard());
        dispatch(hideMonthlyBadgesCard());
        dispatch(showInfoCard());
    }, []);

    useEffect(() => {
        if (!currentPeriodId) return;

        const getUserPeriodProgress = async () => {
            const data = await UserPeriodProgressService.getByPeriodId(currentPeriodId);

            setUserPeriodProgress(data);
        };

        getUserPeriodProgress();
    }, [currentPeriodId]);

    const completedCount = userPeriodProgress ? userPeriodProgress.completedCount : 0;

    return (
        <div>
            <UnitHeaderCard currentTopicOrder={currentTopicOrder} currentUnit={currentUnit} />

            <UnitContainer
                periodId={currentPeriodId}
                periodCompletedCount={completedCount}
                onUnitInView={setCurrentUnit}
                updateCurrentTopicOrder={setCurrentTopicOrder}
            />
        </div>
    );
}
