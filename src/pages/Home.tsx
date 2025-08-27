import { useEffect, useState } from "react";
import UnitContainer from "../components/containers/unitContainer";
import type { UserPeriodProgressDTO } from "../DTOs/userProgressDTO/userPeriodProgressDTO";
import { UserPeriodProgressService } from "../services/userProgress/userPeriodProgressService";
import { useSelector } from "react-redux";
import { selectCurrentPeriodId } from "../slices/userStatisticsSlice";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";
import UnitHeaderCard from "../components/cards/unitHeaderCard";

export default function Home() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const currentPeriodId = useSelector(selectCurrentPeriodId);
    const [userPeriodProgress, setUserPeriodProgress] = useState<UserPeriodProgressDTO | null>();

    const checkIsTokenValid = async () => {
        const isTokenValid = await AuthService.validateToken();

        return isTokenValid;
    };

    useEffect(() => {
        const isTokenValid = checkIsTokenValid();

        if (!token || !isTokenValid) {
            navigate("/login");
        }
    }, [token]);

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
            <UnitHeaderCard />

            <UnitContainer periodId={currentPeriodId} periodCompletedCount={completedCount} />
        </div>
    );
}
