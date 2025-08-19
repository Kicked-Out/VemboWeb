import { useEffect, useState } from "react";
import AuthService from "../../services/authService";
import UserStatisticService from "../../services/userStatisticService";
import type { UserDTO } from "../../DTOs/auth/userDTO";
import type { UserStatisticDTO } from "../../DTOs/userStatisticDTO";
import type { PeriodDTO } from "../../DTOs/periodDTO";
import { PeriodService } from "../../services/periodService";
import { useDispatch, useSelector } from "react-redux";
import {
    giveVBucks,
    selectCurrentPeriodId,
    selectHearts,
    selectStreak,
    selectVBucks,
    setCurrentPeriodId,
    setHearts,
    setStreak,
} from "../../slices/userStatisticsSlice";

export default function Header() {
    const [user, setUser] = useState<UserDTO>();
    const [userStatistic, setUserStatistic] = useState<UserStatisticDTO | null>();

    useEffect(() => {
        const getUser = async () => {
            const data = await AuthService.get();

            setUser(data);
        };

        getUser();
    }, []);

    useEffect(() => {
        const getUserStatistic = async () => {
            if (!user) return;

            const data = await UserStatisticService.getByUserId(user.id);

            setUserStatistic(data);
        };

        getUserStatistic();
    }, [user]);

    const dispatch = useDispatch();
    const hearts = useSelector(selectHearts);
    const streak = useSelector(selectStreak);
    const vBucks = useSelector(selectVBucks);
    const currentPeriodId = useSelector(selectCurrentPeriodId);

    useEffect(() => {
        if (userStatistic) {
            dispatch(setHearts({ hearts: userStatistic.hearts }));
            dispatch(setStreak({ streak: userStatistic.streak }));
            dispatch(giveVBucks({ vBucks: userStatistic.vBucks }));
            dispatch(setCurrentPeriodId({ currentPeriodId: userStatistic.currentPeriodId }));
        }
    }, [userStatistic]);

    const [period, setPeriod] = useState<PeriodDTO | null>();

    useEffect(() => {
        if (!currentPeriodId) return;

        const getPeriod = async () => {
            const data = await PeriodService.getById(currentPeriodId);

            setPeriod(data);
        };

        getPeriod();
    }, [currentPeriodId, userStatistic]);

    return (
        <header className="flex header">
            <div className="header-item period">Period: {period?.title}</div>
            <div className="header-item streak">Streak: {userStatistic?.streak}</div>
            <div className="header-item coins">VBucks: {vBucks}</div>
            <div className="header-item lives">Lives: {hearts}</div>
        </header>
    );
}
