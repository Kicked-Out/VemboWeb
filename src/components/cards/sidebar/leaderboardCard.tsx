import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserLeaderboardDTO } from "../../../DTOs/userLeaderboardDTO";
import UserLeaderboardService from "../../../services/userLeaderboardService";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../slices/authSlice";

export default function LeaderboardCard() {
    const navigate = useNavigate();
    const user = useSelector(selectUserData);
    const [leaderboardEntry, setLeaderboardEntry] = useState<UserLeaderboardDTO>();
    const [rank, setRank] = useState<number>(1);

    const onClickHandler = () => {
        navigate("/leaderboards");
    };

    useEffect(() => {
        const getLeaderboardEntry = async () => {
            const leaderboardEntriesData = await UserLeaderboardService.getAll();

            if (!leaderboardEntriesData) return;

            const userId = user?.id;

            if (!userId) return;

            const leaderboardEntryData = leaderboardEntriesData.filter(
                (leaderboardEntry) => leaderboardEntry.userId === userId
            )[0];

            if (!leaderboardEntryData) return;

            setLeaderboardEntry(leaderboardEntryData);

            const leaderboardEntryIndex = leaderboardEntriesData.indexOf(leaderboardEntryData);
            setRank(leaderboardEntryIndex + 1);
        };

        getLeaderboardEntry();
    }, []);

    return (
        <div className="leaderboard-card">
            <div className="leaderboard-card__block">
                <div className="leaderboard-card__content">
                    <h3 className="leaderboard-card__league-title">Ice League</h3>

                    <h2 className="leaderboard-card__title">
                        You're Ranked
                        <span className="leaderboard-card__rank"> #{rank}</span>
                    </h2>

                    <p className="leaderboard-card__info">You've earned {leaderboardEntry?.xp} XP this week so far</p>
                </div>

                <img
                    className="leaderboard-card__badge-img"
                    src="/src/assets/icons/leaderboards/ice_league_badge.png"
                />
            </div>

            <button className="leaderboard-card__btn" onClick={onClickHandler}>
                Go To Leaderboards
            </button>
        </div>
    );
}
