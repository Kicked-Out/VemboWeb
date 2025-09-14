import { useEffect, useState } from "react";
import type { UserDTO } from "../../../DTOs/auth/userDTO";
import type { UserStatisticDTO } from "../../../DTOs/userStatisticDTO";
import AuthService from "../../../services/authService";
import UserStatisticService from "../../../services/userStatisticService";
import { useDispatch, useSelector } from "react-redux";
import {
    giveVBucks,
    selectHearts,
    selectStreak,
    selectVBucks,
    setCurrentPeriodId,
    setHearts,
    setStreak,
} from "../../../slices/userStatisticsSlice";

export default function StatisticCard() {
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
    // const currentPeriodId = useSelector(selectCurrentPeriodId);

    useEffect(() => {
        if (userStatistic) {
            dispatch(setHearts({ hearts: userStatistic.hearts }));
            dispatch(setStreak({ streak: userStatistic.streak }));
            dispatch(giveVBucks({ vBucks: userStatistic.vBucks }));
            dispatch(setCurrentPeriodId({ currentPeriodId: userStatistic.currentPeriodId }));
        }
    }, [userStatistic]);

    return (
        <div className="stats">
            <div className="stats-item">
                <img className="stats-img" src={`/src/assets/icons/fire${streak > 0 ? "2" : ""}.png`} />
                <p className="stats-value">{streak}</p>
            </div>

            <div className="stats-item">
                <img className="stats-img" src="/src/assets/icons/vembo_coin.png" />
                <p className="stats-value">{vBucks}</p>
            </div>

            <div className="stats-item">
                <img className="stats-img" src="/src/assets/icons/heart.png" />
                <p className="stats-value heart">{hearts}</p>
            </div>
        </div>
    );
}
