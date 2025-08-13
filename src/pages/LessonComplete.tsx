import { useState } from "react";
import ProgressSummary from "../components/lessonContents/ProgressSumary";
import type { Progress, Quest } from "../types/componentTypes";
import StreakUpdate from "../components/lessonContents/StreakUpdate";
import GoalPrompt from "../components/lessonContents/GoalPrompt";
import QuestResults from "../components/lessonContents/QuestResults";
import LegendaryOffer from "../components/lessonContents/LegendaryOffer";
import Reward from "../components/lessonContents/Reward";
import { useNavigate } from "react-router-dom";

export default function LessonComplete() {
    const [step, setStep] = useState<number>(0);

    const progress: Progress = {
        totalXP: 30,
        accuracy: 100,
    };
    const isStreakNotUpdated = true;
    let streak = 1;
    const isLastLevel = true;
    const completedQuests: Quest[] = [
        {
            id: 1,
            title: "Earn 30 XP",
            targetValue: 30,
            reward: 6,
            rewardType: "gems",
        },
        {
            id: 2,
            title: "Earn 30 XP",
            targetValue: 30,
            reward: 30,
            rewardType: "xp",
        },
    ];

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
        isStreakNotUpdated && <StreakUpdate streak={streak} onNext={onNextHandle} />,
        streak === 1 && <GoalPrompt onNext={onNextHandle} />,
        <QuestResults questsCompleted={0} onNext={onNextHandle} />,
        ...completedQuests.map((completedQuest) => (
            <Reward
                key={completedQuest.id}
                reward={completedQuest.reward}
                rewardType={completedQuest.rewardType}
                onNext={onNextHandle}
            />
        )),
        isLastLevel && <LegendaryOffer onNext={onNextHandle} />,
    ].filter(Boolean);

    return <div className="content">{steps[step]}</div>;
}
