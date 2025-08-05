import { useEffect, useState } from "react";
import AuthService from "../../services/authService";
import UserStatisticService from "../../services/userStatisticService";
import type { UserDTO } from "../../DTOs/auth/UserDTO";
import type { userStatisticDTO } from "../../DTOs/userStatisticDTO";
import type { PeriodDTO } from "../../DTOs/periodDTO";
import { PeriodService } from "../../services/periodService";

export default function Header() {
    const [user, setUser] = useState<UserDTO>();
    const [userStatistic, setUserStatistic] = useState<userStatisticDTO | null>();

    useEffect(() => {
        const getUser = async () => {
            const data = await AuthService.get();

            console.log(data);

            setUser(data);
        };

        getUser();
    }, []);

    useEffect(() => {
        const getUserStatistic = async () => {
            const data = await UserStatisticService.getByUserId(user!.id);

            setUserStatistic(data);
        };

        getUserStatistic();
    }, [user]);

    const periodId = userStatistic ? userStatistic.currentPeriodId : 0;

    const [period, setPeriod] = useState<PeriodDTO | null>();

    useEffect(() => {
        const getPeriod = async () => {
            const data = await PeriodService.getById(periodId);

            setPeriod(data);
        };

        getPeriod();
    }, [periodId, userStatistic]);

    return (
        <header className="flex header">
            <div className="header-item period">Period: {period?.title}</div>
            <div className="header-item streak">Streak: {userStatistic?.streak}</div>
            <div className="header-item coins">VBucks: {userStatistic?.vbucks}</div>
            <div className="header-item lives">Lives: {userStatistic?.hearts}</div>
        </header>
    );
}
