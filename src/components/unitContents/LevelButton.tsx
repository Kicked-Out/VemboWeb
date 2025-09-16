import { useNavigate } from "react-router-dom";
import type { LevelButtonComponent } from "../../types/componentTypes";

export default function LevelButton({ id: _id, x, levelTypeId, levelCompletedCount }: LevelButtonComponent) {
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

    const btnPressHandler = () => {
        if (levelCompletedCount !== undefined && levelCompletedCount !== 2) {
            navigate("/lesson");
        }
    };

    return (
        <div className="level-item" data-level-id={_id}>
            <div
                className="level-btn"
                onClick={btnPressHandler}
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
