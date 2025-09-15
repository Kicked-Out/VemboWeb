import { useNavigate } from "react-router-dom";
import type { LevelButtonComponent } from "../../types/componentTypes";
import { useEffect, useRef, useState } from "react";

export default function LevelButton({ id, x, levelTypeId, levelCompletedCount }: LevelButtonComponent) {
    const [btnActive, setBtnActive] = useState<boolean>(false);
    const [btnActiveId, setBtnActiveId] = useState<number>(0);
    const [btnSize, setBtnSize] = useState<{ width: number }>({ width: 0 });
    const btnRef = useRef<HTMLDivElement>(null);
    const levelTypes: Record<number, string> = {
        1: "default",
        2: "practice",
        3: "review",
        4: "chest",
    };
    const navigate = useNavigate();

    const getLevelImage = () => {
        return levelTypes[levelTypeId] || "default";
    };

    const btnPressHandler = (id: number) => {
        setBtnActiveId(id);
        setBtnActive(!btnActive);

        if (levelCompletedCount !== undefined && levelCompletedCount !== 2) {
            navigate("/lesson");
        }
    };

    useEffect(() => {
        if (!btnRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            const rect = entries[0].contentRect;
            setBtnSize({ width: rect.width });
        });

        resizeObserver.observe(btnRef.current);

        return () => resizeObserver.disconnect();
    }, []);

    return (
        <div key={id} className="level-item">
            <div
                ref={btnRef}
                className="level-btn"
                onClick={() => {
                    btnPressHandler(id);
                }}
                style={{ left: `${x}px` }}
            >
                <div className={`level-btn-top ${levelCompletedCount! >= 0 ? "level-btn-top-active" : ""}`}>
                    {levelCompletedCount! >= 1 ? (
                        <img className="level-btn-lighting" src="../src/assets/icons/levels/active_btn_lighting.png" />
                    ) : null}

                    <img
                        className="level-btn-icon"
                        src={`../src/assets/icons/levels/${getLevelImage()}_${
                            levelCompletedCount === 1 ? "complete" : levelCompletedCount === 0 ? "active" : "inactive"
                        }.png`}
                    />
                </div>
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
