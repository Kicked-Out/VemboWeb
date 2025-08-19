import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUserData } from "../slices/authSlice";
import { useEffect, useState } from "react";
import type { UserDTO } from "../DTOs/auth/userDTO";
import type { UserAchievementDTO } from "../DTOs/userAchievementDTO";
import type { AchievementDTO } from "../DTOs/achievementDTO";
import type { AchievementLevelDTO } from "../DTOs/achievementLevel";
import { UserService } from "../services/userService";
import { UserAchievementService } from "../services/userAchievementService";
import { AchievementService } from "../services/achievementService";
import { AchievementLevelService } from "../services/achievementLevelService";

export default function Achievements() {
    const { nickName } = useParams();
    const authUser = useSelector(selectUserData);
    const [user, setUser] = useState<UserDTO | null>(null);
    const [userAchievements, setUserAchievements] = useState<UserAchievementDTO[]>([]);
    const [achievements, setAchievements] = useState<AchievementDTO[]>([]);
    const [achievementLevels, setAchievementLevels] = useState<AchievementLevelDTO[]>([]);

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
    }, [nickName, authUser]);

    useEffect(() => {
        if (!user) return;

        const getUserAchievements = async () => {
            const data = await UserAchievementService.getByUserId(user.id);

            setUserAchievements(data);
        };

        getUserAchievements();
    }, [user]);

    useEffect(() => {
        const getAchievements = async () => {
            const data = await AchievementService.getAll();

            setAchievements(data);
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
            <div className="achievements">
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
    );
}
