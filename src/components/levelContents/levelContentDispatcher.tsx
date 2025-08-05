import type { LevelContentDispatcherComponent } from "../../types/componentTypes";
import CompletedLevel from "./completedLevel";
import LegendaryLevel from "./legendaryLevel";
import LockedLevel from "./lockedLevel";
import OngoingLevel from "./ongoingLevel";

export default function LevelContentDispatcher({
    id,
    title,
    btnActive,
    btnActiveId,
    levelCompletedCount,
    currentLessonOrder,
    lessonAmount,
}: LevelContentDispatcherComponent) {
    return (
        <div className={btnActive && id === btnActiveId ? "level-content" : "hidden"}>
            {title}
            {levelCompletedCount === null || levelCompletedCount === undefined ? (
                <LockedLevel />
            ) : levelCompletedCount === 1 ? (
                <LegendaryLevel />
            ) : levelCompletedCount === 2 ? (
                <CompletedLevel />
            ) : (
                <OngoingLevel currentLessonOrder={currentLessonOrder} lessonAmount={lessonAmount} />
            )}
        </div>
    );
}
