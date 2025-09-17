import { useEffect, useState } from "react";
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
    setPage,
    showNavbar,
    showWhatAreLeaderboardsCard,
} from "../slices/menuSlice";
import type { UserLeaderboardDTO } from "../DTOs/userLeaderboardDTO";
import type { UserDTO } from "../DTOs/auth/userDTO";
import UserLeaderboardService from "../services/userLeaderboardService";
import { UserService } from "../services/userService";
import LeaderboardsContent from "../components/leaderboardContents/leaderboardsContent";
import LockedLeaderboards from "../components/leaderboardContents/lockedLeaderboards";

export default function Leaderboards() {
    const dispatch = useDispatch();
    const isFirstLevelStatus = useSelector(selectFirstLevelStatus);

    useEffect(() => {
        dispatch(showNavbar());
        dispatch(setPage({ selectedPage: 2 }));

        if (isFirstLevelStatus === 1) {
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

    const [userLeaderboards, setUserLeaderboards] = useState<UserLeaderboardDTO[]>([]);
    const [users, setUsers] = useState<UserDTO[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            const userLeaderboardsData = await UserLeaderboardService.getAll();

            setUserLeaderboards(userLeaderboardsData);

            const usersData = await Promise.all(
                userLeaderboardsData.map((userLeaderboard) => UserService.getById(userLeaderboard.userId))
            );

            setUsers(usersData.filter(Boolean) as UserDTO[]);
        };

        getUsers();
    }, []);

    return isFirstLevelStatus === 1 ? <LockedLeaderboards /> : <LeaderboardsContent />;
}
