import { useEffect, useState } from "react";
import type { LevelNodeComponent } from "../../types/componentTypes";
import type { LessonDTO } from "../../DTOs/lessonDTO";
import { LessonService } from "../../services/lessonService";
import { UserLessonProgressService } from "../../services/userProgress/userLessonProgressService";
import type { UserLevelProgressDTO } from "../../DTOs/userProgressDTO/userLevelProgressDTO";
import { UserLevelProgressService } from "../../services/userProgress/userLevelProgressService";
import { useSelector } from "react-redux";
import { selectFirstLevelStatus, selectSecondLevelStatus } from "../../slices/menuSlice";
import ChestButton from "../unitContents/chestButton";
import LevelButton from "../unitContents/LevelButton";

export default function LevelNode({ id, levelTypeId, unitCompletedCount, x }: LevelNodeComponent) {
    const levelTypes: Record<number, string> = {
        1: "default",
        2: "practice",
        3: "review",
        4: "chest",
    };

    const getLevelImage = () => {
        return levelTypes[levelTypeId] || "default";
    };

    const [lessons, setLessons] = useState<LessonDTO[]>([]);

    useEffect(() => {
        if (unitCompletedCount === undefined) return;
        if (unitCompletedCount > 0) return;

        const getLessons = async () => {
            const data = await LessonService.getAllByLevelId(id);

            setLessons(data);
        };

        getLessons();
    }, [unitCompletedCount]);

    const [currentLesson, setCurrentLesson] = useState<LessonDTO | null>(null);

    useEffect(() => {
        if (unitCompletedCount === undefined) return;
        if (unitCompletedCount > 0) return;

        const getCurrentLesson = async () => {
            const lastUserLessonData = await UserLessonProgressService.getCurrentByLevelId(id);

            if (!lastUserLessonData) return;

            const lessonId = lastUserLessonData.lessonId;

            const lesson = await LessonService.getById(lessonId);

            setCurrentLesson(lesson);
        };

        getCurrentLesson();
    }, [unitCompletedCount]);

    const [userLevelProgress, setUserLevelProgress] = useState<UserLevelProgressDTO | null>(null);

    useEffect(() => {
        if (unitCompletedCount === undefined) return;
        if (unitCompletedCount > 0) return;

        const getUserLevelProgress = async () => {
            try {
                const data = await UserLevelProgressService.getByLevelId(id);

                setUserLevelProgress(data);
            } catch {
                return;
            }
        };

        getUserLevelProgress();
    }, [unitCompletedCount]);

    const firstLevelStatus = useSelector(selectFirstLevelStatus);
    const secondLevelStatus = useSelector(selectSecondLevelStatus);

    let levelCompletedCount: number | undefined;

    if (currentLesson) {
        if (currentLesson.id === 1) {
            levelCompletedCount = firstLevelStatus === 2 ? 1 : firstLevelStatus === 1 ? 0 : undefined;
        } else if (currentLesson.id === 3) {
            levelCompletedCount = secondLevelStatus === 2 ? 1 : secondLevelStatus === 1 ? 0 : undefined;
        } else {
            levelCompletedCount =
                unitCompletedCount === undefined || unitCompletedCount > 0
                    ? unitCompletedCount
                    : userLevelProgress?.completedCount;
        }
    }

    return getLevelImage() === "chest" ? (
        <ChestButton id={id} x={x} levelTypeId={levelTypeId} levelCompletedCount={levelCompletedCount} />
    ) : (
        <LevelButton id={id} x={x} levelTypeId={levelTypeId} levelCompletedCount={levelCompletedCount} />
    );
}
