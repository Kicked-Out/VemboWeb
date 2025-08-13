import { useEffect, useState } from "react";
import UnitContainer from "../components/containers/unitContainer";
import type { UserDTO } from "../DTOs/auth/userDTO";
import type { userStatisticDTO } from "../DTOs/userStatisticDTO";
import AuthService from "../services/authService";
import UserStatisticService from "../services/userStatisticService";
import type { UserPeriodProgressDTO } from "../DTOs/userProgressDTO/userPeriodProgressDTO";
import { UserPeriodProgressService } from "../services/userProgress/userPeriodProgressService";
import { useSelector } from "react-redux";
import { selectCurrentPeriodId } from "../slices/userStatisticsSlice";

export default function Home() {
    const currentPeriodId = useSelector(selectCurrentPeriodId);
    const [userPeriodProgress, setUserPeriodProgress] = useState<UserPeriodProgressDTO | null>();

    useEffect(() => {
        const getUserPeriodProgress = async () => {
            if (!currentPeriodId) return;

            const data = await UserPeriodProgressService.getByPeriodId(currentPeriodId);

            setUserPeriodProgress(data);
        };

        getUserPeriodProgress();
    }, [currentPeriodId]);

    const completedCount = userPeriodProgress ? userPeriodProgress.completedCount : 0;

    return (
        <div>
            <UnitContainer periodId={currentPeriodId} periodCompletedCount={completedCount} />
        </div>
    );
}
