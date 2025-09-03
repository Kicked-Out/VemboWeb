import { useEffect, useRef, useState } from "react";
import type { LevelNodeComponent } from "../../types/componentTypes";
import type { LessonDTO } from "../../DTOs/lessonDTO";
import { LessonService } from "../../services/lessonService";
import { UserLessonProgressService } from "../../services/userProgress/userLessonProgressService";
import type { UserLevelProgressDTO } from "../../DTOs/userProgressDTO/userLevelProgressDTO";
import { UserLevelProgressService } from "../../services/userProgress/userLevelProgressService";
import LevelContentDispatcher from "../levelContents/levelContentDispatcher";
import { Link } from "react-router-dom";

export default function LevelNode({ id, title, levelTypeId, unitCompletedCount, x }: LevelNodeComponent) {
    const [btnActive, setBtnActive] = useState<boolean>(false);
    const [btnActiveId, setBtnActiveId] = useState<number>(0);
    const levelTypes: Record<number, string> = {
        1: "default",
        2: "practice",
        3: "review",
        4: "chest",
    };

    const getLevelImage = () => {
        return levelTypes[levelTypeId] || "default";
    };

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
            const lessonId = lastUserLessonData!.id;

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

    const [btnSize, setBtnSize] = useState<{ width: number }>({ width: 0 });
    const btnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!btnRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            const rect = entries[0].contentRect;
            setBtnSize({ width: rect.width });
        });

        resizeObserver.observe(btnRef.current);

        return () => resizeObserver.disconnect();
    }, []);

    return getLevelImage() === "chest" ? (
        <div
            ref={btnRef}
            className="chest-btn"
            onClick={() => {
                btnPressHandler(id);
            }}
            style={{ left: `${x}px` }}
        >
            <img
                className="chest-icon"
                src={`../src/assets/icons/levels/${getLevelImage()}_${
                    levelCompletedCount! >= 1 ? "active" : "inactive"
                }.png`}
            />
        </div>
    ) : (
        <div key={id} className="level-item">
            <div
                ref={btnRef}
                className="level-btn"
                onClick={() => {
                    btnPressHandler(id);
                }}
                style={{ left: `${x}px` }}
            >
                <Link
                    to="/lesson"
                    className={`level-btn-top ${levelCompletedCount! >= 0 ? "level-btn-top-active" : ""}`}
                >
                    {levelCompletedCount! >= 1 ? (
                        <img className="level-btn-lighting" src="../src/assets/icons/levels/active_btn_lighting.png" />
                    ) : null}

                    <img
                        className="level-btn-icon"
                        src={`../src/assets/icons/levels/${getLevelImage()}_${
                            levelCompletedCount! >= 0 ? "active" : "inactive"
                        }.png`}
                    />
                </Link>
            </div>

            {/* <LevelContentDispatcher
                id={id}
                title={title}
                btnActive={btnActive}
                btnActiveId={btnActiveId}
                levelCompletedCount={levelCompletedCount}
                currentLessonOrder={currentLesson?.order}
                lessonAmount={lessons.length}
            /> */}
        </div>
    );
}
