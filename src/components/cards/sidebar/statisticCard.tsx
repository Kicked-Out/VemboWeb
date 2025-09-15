import { useEffect, useState } from "react";
import type { UserDTO } from "../../../DTOs/auth/userDTO";
import AuthService from "../../../services/authService";
import { useSelector } from "react-redux";
import { selectHearts, selectStreak, selectVBucks } from "../../../slices/userStatisticsSlice";

export default function StatisticCard() {
    const [user, setUser] = useState<UserDTO>();
    const [token, setToken] = useState<string | null>();

    useEffect(() => {
        const handleStorage = () => {
            setToken(localStorage.getItem("token"));
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    useEffect(() => {
        if (!token) return;

        const getUser = async () => {
            const data = await AuthService.get();

            setUser(data);
        };

        getUser();
    }, [token]);

    const hearts = useSelector(selectHearts);
    const streak = useSelector(selectStreak);
    const vBucks = useSelector(selectVBucks);

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
