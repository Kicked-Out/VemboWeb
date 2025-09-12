import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { selectUserData } from "../slices/authSlice";
import { UserPeriodProgressService } from "../services/userProgress/userPeriodProgressService";
import {
    hideInsightCard,
    hideLeaderboardCard,
    hideWhatAreLeaderboardsCard,
    showAdBlockerCard,
    showDailyQuestCard,
    showNavbar,
    showSidebar,
} from "../slices/menuSlice";

export default function Profile() {
    const dispatch = useDispatch();
    const { nickName } = useParams();
    const authUser = useSelector(selectUserData);
    const authStats = useSelector(selectUserStatistics);
    const [user, setUser] = useState<UserDTO | null>(null);
    const userStats = useSelector(selectUserStatistics);
    const [period, setPeriod] = useState<PeriodDTO | null>(null);
    const [userAchievements, setUserAchievements] = useState<UserAchievementDTO[]>([]);
    const [achievements, setAchievements] = useState<AchievementDTO[]>([]);
    const [achievementLevels, setAchievementLevels] = useState<AchievementLevelDTO[]>([]);

    useEffect(() => {
        dispatch(showNavbar());
        dispatch(showSidebar());
        dispatch(hideInsightCard());
        dispatch(hideLeaderboardCard());
        dispatch(showDailyQuestCard());
        dispatch(showAdBlockerCard());
        dispatch(hideWhatAreLeaderboardsCard());
    }, []);

    useEffect(() => {
        if (authUser === null) return;

        const load = async () => {
            if (authUser.nickNameSlug === nickName) {
                setUser(authUser);
                return;
            }

            const data = await UserService.getByNickNameSlug(nickName!);

            if (!data) return;

            setUser(data);
        };

        load();
    }, [nickName, authUser, authStats]);

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

            setUserAchievements(data.slice(0, 2));
        };

        getUserAchievements();
    }, [user]);

    useEffect(() => {
        const getAchievements = async () => {
            const data = await AchievementService.getAll();

            setAchievements(data.slice(0, 2));
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
                <img className="profile-image" src="/src/assets/icons/profile/profile_img.png" />

                <div className="profile-content">
                    <h1 className="profile-nickname">{user?.nickName}</h1>
                    <h2 className="profile-created-at">Joined March 2024</h2>

                    {/* <div className="flex">
                        <div className="profile-connections">
                            <p className="blue-text">0 Following</p>
                            <p className="blue-text">0 Followers</p>
                        </div>
                        <p>Current Period: {period?.title}</p>
                    </div> */}

                    {/* {authUser !== user ? (
                        <div className="btn-block">
                            <PrimaryButton title="Follow" onClick={() => {}} />
                            <SecondaryButton title="Report" onClick={() => {}} />
                            <SecondaryButton title="Block" onClick={() => {}} />
                        </div>
                    ) : null} */}
                </div>

                <hr className="profile-divider" />

                <h2 className="category-title">Statistics</h2>

                <div className="profile-statistics">
                    {userStats && userStats.streak === 0 ? (
                        <div className="streak-card">
                            <div className="streak-background inactive-streak-card">
                                <img
                                    className="streak-lightning"
                                    src="/src/assets/icons/profile/statistics/card_lightning.png"
                                />

                                <img
                                    className="small-streak-star"
                                    src="/src/assets/icons/profile/statistics/small_streak_star.png"
                                />
                                <img
                                    className="streak-star"
                                    src="/src/assets/icons/profile/statistics/streak_star.png"
                                />
                            </div>

                            <div className="streak-content">
                                <img
                                    className="streak-icon inactive-streak-icon"
                                    src="/src/assets/icons/profile/statistics/streak_fire_active.png"
                                />

                                <div className="streak-info">
                                    <p className="inactive-streak-title">{userStats ? userStats.streak : 0}</p>
                                    <p className="inactive-streak-subtitle">Day Streak</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="streak-card">
                            <div className="streak-background">
                                <img
                                    className="streak-lightning"
                                    src="/src/assets/icons/profile/statistics/card_lightning.png"
                                />

                                <img
                                    className="small-streak-star"
                                    src="/src/assets/icons/profile/statistics/small_streak_star.png"
                                />
                                <img
                                    className="streak-star"
                                    src="/src/assets/icons/profile/statistics/streak_star.png"
                                />
                            </div>

                            <div className="streak-content">
                                <img
                                    className="streak-icon"
                                    src="/src/assets/icons/profile/statistics/streak_fire_active.png"
                                />

                                <div className="streak-info">
                                    <p className="streak-title">{userStats?.streak}</p>
                                    <p className="streak-subtitle">Day Streak</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="statistic-card">
                        <img className="statistic-icon" src="/src/assets/icons/profile/statistics/total_xp.png" />

                        <div className="statistic-info">
                            <p className="statistic-title">{userStats ? userStats.vBucks : 0}</p>
                            <p className="statistic-subtitle">Total XP</p>
                        </div>
                    </div>

                    <div className="statistic-card">
                        <img
                            className="statistic-icon"
                            src="/src/assets/icons/profile/statistics/small_ice_league.png"
                        />

                        <div className="statistic-info">
                            <p className="statistic-title">Ice</p>
                            <p className="statistic-subtitle">Current league</p>
                        </div>

                        <div className="statistic-small-card">
                            <p className="statistic-small-title">Week 1</p>
                        </div>
                    </div>

                    <div className="statistic-card">
                        <img
                            className="statistic-icon"
                            src="/src/assets/icons/profile/statistics/top_three_finishes.png"
                        />

                        <div className="statistic-info">
                            <p className="statistic-title">0</p>
                            <p className="statistic-subtitle">Top 3 finishes</p>
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
                                    <img
                                        className="achievement-icon"
                                        src="/src/assets/icons/profile/achievements/historian_ages_icon.png"
                                    />
                                    {/* <p className="achievement-image-title">LEVEL {userAchievement.currentLevel}</p> */}
                                </div>

                                <div className="achievement-block">
                                    <div className="achievement-title-container">
                                        <h2 className="achievement-title">{achievementData?.title}</h2>
                                        <p className="achievement-progress-text">
                                            {userAchievement.progress}/{achievementLevelData?.targetValue}
                                        </p>
                                    </div>

                                    <div className="achievement-progress-bar">
                                        <div className="achievement-progress"></div>
                                    </div>

                                    <p className="achievement-description">
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
