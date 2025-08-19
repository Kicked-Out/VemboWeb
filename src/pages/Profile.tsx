import { useEffect, useState } from "react";
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
import { Link, useParams } from "react-router-dom";
import { UserService } from "../services/userService";
import type { UserDTO } from "../DTOs/auth/userDTO";
import UserStatisticService from "../services/userStatisticService";
import type { UserStatisticDTO } from "../DTOs/userStatisticDTO";
import { selectUserData } from "../slices/authSlice";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SecondaryButton from "../components/buttons/SecondaryButton";
import { UserPeriodProgressService } from "../services/userProgress/userPeriodProgressService";

export default function Profile() {
    const { nickName } = useParams();
    const authUser = useSelector(selectUserData);
    const authStats = useSelector(selectUserStatistics);
    const [user, setUser] = useState<UserDTO | null>(null);
    const [userStats, setUserStats] = useState<UserStatisticDTO | null>(null);
    const [period, setPeriod] = useState<PeriodDTO | null>(null);
    const [userAchievements, setUserAchievements] = useState<UserAchievementDTO[]>([]);
    const [achievements, setAchievements] = useState<AchievementDTO[]>([]);
    const [achievementLevels, setAchievementLevels] = useState<AchievementLevelDTO[]>([]);

    useEffect(() => {
        if (authUser === null) return;

        const load = async () => {
            if (authUser.nickNameSlug === nickName) {
                setUser(authUser);
                setUserStats(authStats);
                return;
            }

            const data = await UserService.getByNickNameSlug(nickName!);

            if (!data) return;

            setUser(data);
        };

        load();
    }, [nickName, authUser, authStats]);

    useEffect(() => {
        if (!authStats) return;
        if (!user) return;

        if (authStats.userId !== user.id) {
            const getUserStats = async () => {
                const data = await UserStatisticService.getByUserId(user.id);

                if (!data) return;

                setUserStats(data);
            };

            getUserStats();
        }
    }, [user, authStats]);

    useEffect(() => {
        if (!user) return;

        const getPeriodWithMostXP = async () => {
            const userPeriodData = await UserPeriodProgressService.getWithMostXPByUserId(user.id);
            const periodData = await PeriodService.getById(userPeriodData?.periodId || 0);

            setPeriod(periodData);
        };

        getPeriodWithMostXP();
    }, [user]);

    useEffect(() => {
        if (!user) return;

        const getUserAchievements = async () => {
            const data = await UserAchievementService.getByUserId(user.id);

            setUserAchievements(data.slice(0, 3));
        };

        getUserAchievements();
    }, [user]);

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

                    {authUser !== user ? (
                        <div className="btn-block">
                            <PrimaryButton title="Follow" onClick={() => {}} />
                            <SecondaryButton title="Report" onClick={() => {}} />
                            <SecondaryButton title="Block" onClick={() => {}} />
                        </div>
                    ) : null}
                </div>

                <hr />

                <h2 className="category-title">Statistics</h2>

                <div className="profile-statistics">
                    <div className="statistic-card">
                        <img className="icon" />

                        <div className="statistic-info">
                            <p>{userStats?.streak}</p>
                            <p>Day Streak</p>
                        </div>

                        <div className="statistic-info">
                            <p>{userStats?.vBucks}</p>
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
                    <Link className="category-link" to="achievements">
                        VIEW ALL
                    </Link>
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
