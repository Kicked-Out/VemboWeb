import { useEffect, useState } from "react";
import type { UserDTO } from "../DTOs/auth/userDTO";
import { UserService } from "../services/userService";
import { useSelector } from "react-redux";
import { selectUserStatistics } from "../slices/selectors";
import type { PeriodDTO } from "../DTOs/periodDTO";
import { PeriodService } from "../services/periodService";
import type { AchievementDTO } from "../DTOs/achievementDTO";
import type { AchievementLevelDTO } from "../DTOs/achievementLevel";
import { UserAchievementService } from "../services/userAchievementService";
import { AchievementService } from "../services/achievementService";
import { AchievementLevelService } from "../services/achievementLevelService";
import type { UserAchievementDTO } from "../DTOs/userAchievementDTO";

export default function Profile() {
    const [user, setUser] = useState<UserDTO>();
    const userStats = useSelector(selectUserStatistics);
    const [period, setPeriod] = useState<PeriodDTO | null>(null);
    const [userAchievements, setUserAchievements] = useState<UserAchievementDTO[]>([]);
    const [achievements, setAchievements] = useState<AchievementDTO[]>([]);
    const [achievementLevels, setAchievementLevels] = useState<AchievementLevelDTO[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            const data = await UserService.get();

            setUser(data);
        };

        getUsers();
    }, []);

    useEffect(() => {
        if (!userStats.currentPeriodId) return;

        const getCurrentPeriod = async () => {
            const data = await PeriodService.getById(userStats.currentPeriodId);

            setPeriod(data);
        };

        getCurrentPeriod();
    }, [userStats]);

    useEffect(() => {
        const getUserAchievements = async () => {
            const data = await UserAchievementService.getAll();

            setUserAchievements(data.slice(0, 3));
        };

        getUserAchievements();
    }, []);

    useEffect(() => {
        const getAchievements = async () => {
            const data = await AchievementService.getAll();

            setAchievements(data.slice(0, 3));
        };

        getAchievements();
    }, []);

    useEffect(() => {
        if (achievements.length === 0) return;
        if (userAchievements.length === 0) return;

        const getAchievementLevels = async () => {
            const achievementLevelData: AchievementLevelDTO[] = [];

            for (let i = 0; i < achievements.length; i++) {
                const data = await AchievementLevelService.getByAchievementIdAndLevel(
                    achievements[i].id,
                    userAchievements[i].currentLevel
                );

                if (!data) continue;

                achievementLevelData.push(data);
            }

            setAchievementLevels(achievementLevelData);
        };

        getAchievementLevels();
    }, [achievements, userAchievements]);

    return (
        <div className="container">
            <div className="profile-block">
                <img className="profile-image" />

                <div className="profile-conteint">
                    <h1 className="profile-nickname">{user?.nickName}</h1>

                    <div className="flex">
                        <div className="profile-connections">
                            <p className="blue-text">0 Following</p>
                            <p className="blue-text">0 Followers</p>
                        </div>
                        <p>Current Period: {period?.title}</p>
                    </div>
                </div>

                <hr />

                <h2 className="category-title">Statistics</h2>

                <div className="profile-statistics">
                    <div className="statistic-card">
                        <img className="icon" />

                        <div className="statistic-info">
                            <p>{userStats.streak}</p>
                            <p>Day Streak</p>
                        </div>

                        <div className="statistic-info">
                            <p>{userStats.vBucks}</p>
                            <p>Total XP</p>
                        </div>

                        <div className="statistic-info">
                            <p>Silver</p>
                            <p>Current league</p>
                        </div>
                    </div>
                </div>

                <div className="category-block">
                    <h2 className="category-title">Achievements</h2>
                    <a className="category-link">VIEW ALL</a>
                </div>

                <div className="profile-achievements">
                    {userAchievements.map((userAchievement) => {
                        const achievementData = achievements.find((a) => a.id === userAchievement.achievementId);
                        const achievementLevelData = achievementLevels.find(
                            (a) => a.level === userAchievement.currentLevel
                        );

                        return (
                            <div key={userAchievement.id} className="profile-achievement">
                                <div className="achievement-image-container">
                                    <img className="achievement-image" />
                                    <p className="achievement-image-title">LEVEL {userAchievement.currentLevel}</p>
                                </div>

                                <div className="achievement-block">
                                    <div className="achievement-title-container">
                                        <h2 className="achievement-title">{achievementData?.title}</h2>
                                        <p>
                                            {userAchievement.progress}/{achievementLevelData?.targetValue}
                                        </p>
                                    </div>

                                    <div className="progress-bar">
                                        <div className="progress"></div>
                                    </div>

                                    <p>
                                        {achievementData?.description.replace(
                                            "${targetValue}",
                                            `${achievementLevelData?.targetValue}`
                                        )}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
