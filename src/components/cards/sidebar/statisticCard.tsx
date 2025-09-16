import { useSelector } from "react-redux";
import { selectHearts, selectStreak, selectVBucks } from "../../../slices/userStatisticsSlice";

export default function StatisticCard() {
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
