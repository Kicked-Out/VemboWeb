import { useEffect, useState } from "react";
import type { LevelNodeComponent } from "../../types/componentTypes";
import type { LessonDTO } from "../../DTOs/lessonDTO";
import { LessonService } from "../../services/lessonService";
import { UserLessonProgressService } from "../../services/userProgress/userLessonProgressService";
import type { UserLevelProgressDTO } from "../../DTOs/userProgressDTO/userLevelProgressDTO";
import { UserLevelProgressService } from "../../services/userProgress/userLevelProgressService";
import LevelContentDispatcher from "../levelContents/levelContentDispatcher";

export default function LevelNode({ id, title, unitCompletedCount }: LevelNodeComponent) {
    const [btnActive, setBtnActive] = useState<boolean>(false);
    const [btnActiveId, setBtnActiveId] = useState<number>(0);

    const btnPressHandler = (id: number) => {
        setBtnActiveId(id);
        setBtnActive(!btnActive);
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
            const lessonId = lastUserLessonData.id;

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
            const data = await UserLevelProgressService.getByLevelId(id);

            setUserLevelProgress(data);
        };

        getUserLevelProgress();
    }, [unitCompletedCount]);

    const levelCompletedCount =
        unitCompletedCount === undefined || unitCompletedCount > 0
            ? unitCompletedCount
            : userLevelProgress?.completedCount;

    return (
        <div key={id} className="level-container">
            <div
                className="start-btn"
                onClick={() => {
                    btnPressHandler(id);
                }}
            >
                Level Block
            </div>

            <LevelContentDispatcher
                id={id}
                title={title}
                btnActive={btnActive}
                btnActiveId={btnActiveId}
                levelCompletedCount={levelCompletedCount}
                currentLessonOrder={currentLesson?.order}
                lessonAmount={lessons.length}
            />
        </div>
    );
}
