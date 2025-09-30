import { useEffect, useState } from "react";
import ProgressSummary from "../components/lessonContents/ProgressSumary";
import type { Progress } from "../types/componentTypes";
import QuestResults from "../components/lessonContents/QuestResults";
import Reward from "../components/lessonContents/Reward";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLessonTopBottomRows, hideNavbar, hideSidebar } from "../slices/menuSlice";
import { selectExerciseAmount, selectRightAnswers, selectStartedAt } from "../slices/lessonProgressSlice";
import UserStatisticService from "../services/userStatisticService";
import type { UpdateUserTotalXPDTO } from "../DTOs/updateUserTotalXP";
import UserLeaderboardService from "../services/userLeaderboardService";
import { QuestService } from "../services/questService";
import { QuestDefinitionService } from "../services/questDefinitionService";
import type { UpdateQuestProgressDTO } from "../DTOs/updateQuestProgress";
import { UserQuestProgressService } from "../services/userProgress/userQuestProgressService";
import type { QuestDefinitionDTO } from "../DTOs/questDefinitionDTO";
import { giveVBucks } from "../slices/userStatisticsSlice";
import type { UpdateCoinsDTO } from "../DTOs/updateCoinsDTO";
import { UserAchievementService } from "../services/userAchievementService";
import { selectUserData } from "../slices/authSlice";
import { AchievementLevelService } from "../services/achievementLevelService";
import type { UpdateLevelDTO } from "../DTOs/updateUserAchievementDTO";
import { AchievementService } from "../services/achievementService";
import { selectUserStatistics } from "../slices/selectors";

export default function LessonComplete() {
    const [step, setStep] = useState<number>(0);
    const dispatch = useDispatch();
    const startedAtString = useSelector(selectStartedAt);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    let completedCount = 0;
    const [completedQuestsCount, setCompletedQuestsCount] = useState<number>(0);
    const [completedQuests, setCompletedQuests] = useState<QuestDefinitionDTO[]>([]);
    const user = useSelector(selectUserData);
    const userStats = useSelector(selectUserStatistics);

    useEffect(() => {
        dispatch(hideNavbar());
        dispatch(hideSidebar());
        dispatch(hideLessonTopBottomRows());
    }, []);

    useEffect(() => {
        const getAchievements = async () => {
            const achievementsData = await AchievementService.getAll();

            if (!achievementsData) return;

            if (!user) return;
            if (!userStats) return;

            const userAchievementsData = await UserAchievementService.getAllByUserId(user.id);

            if (!userAchievementsData) return;

            const achievementLevelsData = await Promise.all(
                userAchievementsData.map((userAchievementLevelData) =>
                    AchievementLevelService.getByAchievementIdAndLevel(
                        userAchievementLevelData.achievementId,
                        userAchievementLevelData.currentLevel
                    )
                )
            );

            if (!achievementLevelsData) return;

            for (let index in achievementLevelsData) {
                if (!achievementLevelsData[index]) return;

                if (
                    userAchievementsData[index].progress === achievementLevelsData[index].targetValue &&
                    userAchievementsData[index].isCompleted
                ) {
                    continue;
                }

                const data: UpdateLevelDTO = {
                    currentLevel: achievementLevelsData[index].level,
                    progress: 0,
                    isCompleted: false,
                    earnedAt: new Date().toISOString(),
                };

                if (achievementsData[index].targetType === "levels") {
                    const userAchievementProgress = userAchievementsData[index].progress + 1;

                    if (userAchievementProgress < achievementLevelsData[index].targetValue) {
                        data.progress = userAchievementProgress;
                    } else {
                        data.progress = achievementLevelsData[index].targetValue;
                    }
                } else if (achievementsData[index].targetType === "leagues") {
                    // Leagues are not implemented yet
                } else if (achievementsData[index].targetType === "first-answer") {
                    if (userStats.totalXP > 0) {
                        data.progress = 1;
                    }
                } else if (achievementsData[index].targetType === "first-lesson") {
                    if (userStats.totalXP > 0) {
                        data.progress = 1;
                    }
                }

                if (data.progress === achievementLevelsData[index].targetValue) {
                    const isNextLevel = await AchievementLevelService.checkIsNextLevel(
                        achievementLevelsData[index].achievementId,
                        achievementLevelsData[index].level
                    );

                    if (isNextLevel) {
                        data.currentLevel = achievementLevelsData[index].level + 1;
                    } else {
                        data.isCompleted = true;
                    }
                }

                await UserAchievementService.update(userAchievementsData[index].id, data);
            }
        };

        getAchievements();
    }, [user]);

    useEffect(() => {
        const getDailyQuests = async () => {
            const dailyQuestsData = await QuestService.getCurrentDaily();

            if (!dailyQuestsData) return;

            const dailyQuestDefinitionsData = await Promise.all(
                dailyQuestsData.map((dailyQuestData) =>
                    QuestDefinitionService.getById(dailyQuestData.questDefinitionId)
                )
            );

            if (!dailyQuestDefinitionsData) return;

            const dailyUserQuestProgressesData = await Promise.all(
                dailyQuestsData.map((dailyQuestData) => UserQuestProgressService.getByQuestId(dailyQuestData.id))
            );

            if (!dailyUserQuestProgressesData) return;

            let completedQuestsLocal: QuestDefinitionDTO[] = [];

            for (let index in dailyQuestDefinitionsData) {
                if (!dailyQuestDefinitionsData[index]) return;
                if (!dailyUserQuestProgressesData[index]) return;

                const data: UpdateQuestProgressDTO = {
                    progress: 0,
                    isCompleted: false,
                };

                let userQuestProgress = 0;

                if (dailyQuestDefinitionsData[index].requirement === dailyUserQuestProgressesData[index].progress) {
                    setIsLoaded(true);

                    continue;
                }

                if (dailyQuestDefinitionsData[index].requirementType === "xp") {
                    userQuestProgress = dailyUserQuestProgressesData[index].progress + totalXP;

                    if (userQuestProgress < dailyQuestDefinitionsData[index].requirement) {
                        data.progress = userQuestProgress;
                    } else {
                        data.progress = dailyQuestDefinitionsData[index].requirement;
                        data.isCompleted = true;

                        completedCount++;
                        completedQuestsLocal.push(dailyQuestDefinitionsData[index]);
                    }

                    await UserQuestProgressService.updateProgress(dailyUserQuestProgressesData[index].id, data);
                } else if (dailyQuestDefinitionsData[index].requirementType === "time") {
                    const startedAt = new Date(startedAtString!);
                    const finishedAt = new Date();

                    if (isNaN(startedAt.getTime()) || isNaN(finishedAt.getTime())) {
                        return;
                    } else {
                        const totalTimeMs = finishedAt.getTime() - startedAt.getTime();
                        const totalMinutes = Math.floor(totalTimeMs / (1000 * 60));

                        userQuestProgress = dailyUserQuestProgressesData[index].progress + totalMinutes;

                        if (userQuestProgress < dailyQuestDefinitionsData[index].requirement) {
                            data.progress = userQuestProgress;
                        } else {
                            data.progress = dailyQuestDefinitionsData[index].requirement;
                            data.isCompleted = true;

                            completedCount++;
                            completedQuestsLocal.push(dailyQuestDefinitionsData[index]);
                        }

                        await UserQuestProgressService.updateProgress(dailyUserQuestProgressesData[index].id, data);
                    }
                } else if (dailyQuestDefinitionsData[index].requirementType === "perfect-lessons") {
                    if (accuracy === 100) {
                        userQuestProgress = dailyUserQuestProgressesData[index].progress + 1;

                        if (userQuestProgress < dailyQuestDefinitionsData[index].requirement) {
                            data.progress = userQuestProgress;
                        } else {
                            data.progress = dailyQuestDefinitionsData[index].requirement;
                            data.isCompleted = true;

                            completedCount++;
                            completedQuestsLocal.push(dailyQuestDefinitionsData[index]);
                        }

                        await UserQuestProgressService.updateProgress(dailyUserQuestProgressesData[index].id, data);
                    }
                }
            }

            setCompletedQuestsCount(completedCount / 2);
            setCompletedQuests(completedQuestsLocal);
            setIsLoaded(true);
        };

        getDailyQuests();
    }, []);

    useEffect(() => {
        const getMonthlyQuest = async () => {
            const monthlyQuestData = await QuestService.getCurrentMonthly();

            if (!monthlyQuestData) return;

            const monthlyQuestDefinitionData = await QuestDefinitionService.getById(monthlyQuestData.questDefinitionId);

            if (!monthlyQuestDefinitionData) return;

            const monthlyUserQuestProgressData = await UserQuestProgressService.getByQuestId(monthlyQuestData.id);

            if (!monthlyUserQuestProgressData) return;

            const data: UpdateQuestProgressDTO = {
                progress: 0,
                isCompleted: false,
            };

            let userQuestProgress = 0;

            if (monthlyQuestDefinitionData.requirementType === "quests") {
                if (completedCount === 0) return;

                userQuestProgress = monthlyUserQuestProgressData.progress + completedCount;

                if (userQuestProgress <= monthlyQuestDefinitionData.requirement) {
                    data.progress = userQuestProgress;
                } else {
                    data.progress = monthlyQuestDefinitionData.requirement;
                    data.isCompleted = true;

                    setCompletedQuests((prevQuests) => [...prevQuests, monthlyQuestDefinitionData]);
                }

                await UserQuestProgressService.updateProgress(monthlyUserQuestProgressData.id, data);
            }
        };

        getMonthlyQuest();
    }, []);

    const [isAlredyRewarded, setIsAlreadyRewarded] = useState<boolean>(false);

    useEffect(() => {
        if (completedQuests.length === 0) return;
        if (isAlredyRewarded) return;

        const updateReward = async () => {
            completedQuests.forEach(async (completedQuest) => {
                const rewardAmount = completedQuest.rewardAmount;
                const rewardType = completedQuest.rewardType;

                if (rewardType === "coins") {
                    dispatch(giveVBucks({ vBucks: rewardAmount }));

                    const updateVBucksData: UpdateCoinsDTO = {
                        vBucks: rewardAmount,
                    };

                    await UserStatisticService.updateVBucks(updateVBucksData);
                }
            });

            setIsAlreadyRewarded(true);
        };

        updateReward();
    }, [completedQuests, isAlredyRewarded]);

    const rightAnswers = useSelector(selectRightAnswers);
    const exerciseAmount = useSelector(selectExerciseAmount);
    const accuracy = Math.round((100 / exerciseAmount) * rightAnswers);
    const totalXP = Math.round((20 / 100) * accuracy);

    const progress: Progress = {
        totalXP: totalXP,
        accuracy: accuracy,
    };

    useEffect(() => {
        const updateUserStatTotalXP = async () => {
            const totalXPDTO: UpdateUserTotalXPDTO = {
                totalXP: totalXP,
            };

            await UserStatisticService.updateTotalXP(totalXPDTO);
            await UserLeaderboardService.updateTotalXP(totalXPDTO);
        };

        updateUserStatTotalXP();
    }, []);

    const navigate = useNavigate();

    const onNextHandle = () => {
        if (step < steps.length - 1) {
            setStep((s) => s + 1);
        } else {
            navigate("/");
        }
    };

    const steps = [
        <ProgressSummary data={progress} onNext={onNextHandle} />,
        // isStreakNotUpdated && <StreakUpdate onNext={onNextHandle} />,
        // streak === 1 && <GoalPrompt onNext={onNextHandle} />,
        <QuestResults questsCompleted={completedQuestsCount} onNext={onNextHandle} />,
        ...completedQuests.map((completedQuest) => (
            <Reward
                key={completedQuest.id}
                reward={completedQuest.rewardAmount}
                rewardType={completedQuest.rewardType}
                onNext={onNextHandle}
            />
        )),
        // isLastLevel && <LegendaryOffer onNext={onNextHandle} />,
    ].filter(Boolean);

    return <div className={`lesson-content ${isLoaded ? "fade-in" : "fade-out"}`}>{steps[step]}</div>;
}
