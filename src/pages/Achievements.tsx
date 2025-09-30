import { useDispatch, useSelector } from "react-redux";
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
import { hideSidebar, showNavbar } from "../slices/menuSlice";

export default function Achievements() {
    const dispatch = useDispatch();
    const { nickName } = useParams();
    const authUser = useSelector(selectUserData);
    const [user, setUser] = useState<UserDTO | null>(null);
    const [userAchievements, setUserAchievements] = useState<UserAchievementDTO[]>([]);
    const [achievements, setAchievements] = useState<AchievementDTO[]>([]);
    const [achievementLevels, setAchievementLevels] = useState<AchievementLevelDTO[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        dispatch(showNavbar());
        dispatch(hideSidebar());
    });

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
            const data = await UserAchievementService.getAllByUserId(user.id);

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
            setIsLoaded(true);
        };

        getAchievementLevels();
    }, [achievements, userAchievements]);

    return (
        <div className="container">
            <div className={`achievements ${isLoaded ? "fade-in" : "fade-out"}`}>
                <h1 className="achievements-title">All Achievements</h1>

                {userAchievements.map((userAchievement) => {
                    const achievementData = achievements.find((a) => a.id === userAchievement.achievementId);
                    const achievementLevelData = achievementLevels.find(
                        (a) => a.level === userAchievement.currentLevel
                    );

                    return (
                        <div key={userAchievement.id} className="profile-achievement">
                            <div className="achievement-image-container">
                                <img className="achievement-icon" src={achievementData?.iconUrl} />
                                {/* <p className="achievement-image-title">LEVEL {userAchievement.currentLevel}</p> */}
                            </div>

                            <div className="achievement-block">
                                <div className="achievement-title-container">
                                    <h2 className="achievement-title">{achievementData?.title}</h2>
                                    <p
                                        className={`achievement-progress-text ${
                                            userAchievement.isCompleted ? "hidden" : ""
                                        }`}
                                    >
                                        {achievementLevelData
                                            ? `${userAchievement.progress}/${achievementLevelData?.targetValue}`
                                            : null}
                                    </p>
                                </div>

                                <div className="achievement-progress-bar">
                                    <div
                                        className="achievement-progress"
                                        style={{
                                            width: `${
                                                userAchievement.isCompleted
                                                    ? 100
                                                    : achievementLevelData
                                                    ? (100 / achievementLevelData.targetValue) *
                                                      userAchievement.progress
                                                    : 0
                                            }%`,
                                        }}
                                    ></div>
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
    );
}
