import type { UnitDTO } from "../DTOs/unitDTO";
import type { UserLevelProgressDTO } from "../DTOs/userProgressDTO/userLevelProgressDTO";

export interface LevelNodeComponent {
    id: number;
    title: string;
    unitCompletedCount: number | undefined;
    currentLevel: number;
    levelAmount: number;
}

export interface levelNodesComponent {
    unitId: number;
    unitCompletedCount: number | undefined;
}

export interface OngoingLevelComponent {
    currentLessonOrder: number | undefined;
    lessonAmount: number;
}

export interface LevelContentDispatcherComponent {
    id: number;
    title: string;
    btnActive: boolean;
    btnActiveId: number;
    levelCompletedCount: number | undefined;
    currentLessonOrder: number | undefined;
    lessonAmount: number;
}

export interface UnitComponent {
    unit: UnitDTO;
    topicCompletedCount: number | undefined;
}

export interface UnitContainerComponent {
    periodId: number;
    periodCompletedCount: number | undefined;
}
