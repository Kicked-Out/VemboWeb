import { useEffect, useState } from "react";
import type { UserLeaderboardDTO } from "../../DTOs/userLeaderboardDTO";
import type { UserDTO } from "../../DTOs/auth/userDTO";
import UserLeaderboardService from "../../services/userLeaderboardService";
import { UserService } from "../../services/userService";

export default function LeaderboardsContent() {
    const [userLeaderboards, setUserLeaderboards] = useState<UserLeaderboardDTO[]>([]);
    const [users, setUsers] = useState<UserDTO[]>([]);

    const userColors = [
        "#2EE6C3", // Mint
        "#A259FF", // Purple
        "#FFD500", // Yellow
        "#2EE6C3", // Mint
        "#FF6B6B", // Peach
        "#FFD500", // Yellow
        "#2EE6C3", // Mint
        "#A259FF", // Purple
        "#FF6B6B", // Peach
        "#2EE6C3", // Mint
        "#FF6B6B", // Peach
        "#A259FF", // Purple
        "#2EE6C3", // Mint
        "#A259FF", // Purple
        "#FFD500", // Yellow
    ];

    useEffect(() => {
        const getUsers = async () => {
            const userLeaderboardsData = await UserLeaderboardService.getAll();

            setUserLeaderboards(userLeaderboardsData);

            const usersData = await Promise.all(
                userLeaderboardsData.map((userLeaderboard) => UserService.getById(userLeaderboard.userId))
            );

            console.log(usersData);

            setUsers(usersData.filter(Boolean) as UserDTO[]);
        };

        getUsers();
    }, []);

    return (
        <div className="leaderboards">
            <div className="leagues-container">
                <div className="leagues-block">
                    <img className="current-league" src="/src/assets/icons/leaderboards/leagues/ice_league.png" />
                    <img className="locked-league" src="/src/assets/icons/leaderboards/leagues/locked_league.png" />
                    <img className="locked-league" src="/src/assets/icons/leaderboards/leagues/locked_league.png" />
                    <img className="locked-league" src="/src/assets/icons/leaderboards/leagues/locked_league.png" />
                    <img className="locked-league" src="/src/assets/icons/leaderboards/leagues/locked_league.png" />
                    <img className="locked-league" src="/src/assets/icons/leaderboards/leagues/locked_league.png" />
                </div>

                <div className="current-league-block">
                    <h1 className="current-league-title">Ice League</h1>
                    <h2 className="current-league-description">Top 8 advance to the next league</h2>
                    <h3 className="next-league-time-remaining">1 day</h3>
                </div>
            </div>

            <div className="users-block">
                {users.map((user, index) => (
                    <div key={user.id} className="user">
                        <div className="user-info">
                            {index + 1 >= 1 && index + 1 <= 3 ? (
                                <img
                                    className="user-top-img"
                                    src={`/src/assets/icons/leaderboards/top-icons/top${index + 1}.png`}
                                />
                            ) : (
                                <p className="user-top">{index + 1}</p>
                            )}

                            <img
                                className="user-avatar"
                                style={{ ["--user-avatar-background" as any]: userColors[index % userColors.length] }}
                            />

                            <p className="user-nickname">{user.nickName}</p>
                        </div>

                        <p className="user-totalxp">
                            {userLeaderboards.find((userLeaderboards) => userLeaderboards.userId === user.id)?.xp}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
