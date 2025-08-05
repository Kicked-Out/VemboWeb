import { useEffect, useState } from "react";
import UnitContainer from "../components/containers/unitContainer";
import type { UserDTO } from "../DTOs/auth/userDTO";
import type { userStatisticDTO } from "../DTOs/userStatisticDTO";
import AuthService from "../services/authService";
import UserStatisticService from "../services/userStatisticService";
import type { UserPeriodProgressDTO } from "../DTOs/userProgressDTO/userPeriodProgressDTO";
import { UserPeriodProgressService } from "../services/userProgress/userPeriodProgressService";

export default function Home() {
    const [user, setUser] = useState<UserDTO>();
    const [userStatistic, setUserStatistic] = useState<userStatisticDTO | null>();

    useEffect(() => {
        const getUser = async () => {
            const data = await AuthService.get();

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

    const periodId = userStatistic?.currentPeriodId;

    const [userPeriodProgress, setUserPeriodProgress] = useState<UserPeriodProgressDTO | null>();

    useEffect(() => {
        const getUserPeriodProgress = async () => {
            const data = await UserPeriodProgressService.getByPeriodId(periodId!);

            setUserPeriodProgress(data);
        };

        getUserPeriodProgress();
    }, [userStatistic]);

    const completedCount = userPeriodProgress ? userPeriodProgress.completedCount : 0;

    return (
        <div>
            <UnitContainer periodId={periodId ? periodId : 0} periodCompletedCount={completedCount} />
        </div>
    );
}
