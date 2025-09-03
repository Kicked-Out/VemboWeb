import type { AnswerDTO } from "../DTOs/answerDTO";
import type { QuestionDTO } from "../DTOs/questionDTO";
import type { UnitDTO } from "../DTOs/unitDTO";

export interface LevelNodeComponent {
    id: number;
    title: string;
    levelTypeId: number;
    unitCompletedCount: number | undefined;
    currentLevel: number;
    levelAmount: number;
    x: number;
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
    onUnitInView: (unit: UnitDTO) => void;
}

export interface UnitContainerComponent {
    periodId: number;
    periodCompletedCount: number | undefined;
    onUnitInView: (unit: UnitDTO) => void;
    updateCurrentTopicOrder: (order: number) => void;
}

export interface Progress {
    totalXP: number;
    accuracy: number;
}

export interface Quest {
    id: number;
    title: string;
    iconUrl?: string;
    targetValue: number;
    reward: number;
    rewardType: string;
}

export interface ProgressSummaryComponents {
    data: Progress;
    onNext: () => void;
}

export interface StreakUpdateComponents {
    streak: number;
    onNext: () => void;
}

export interface GoalPromptComponents {
    onNext: () => void;
}

export interface QuestResultsComponents {
    questsCompleted: number;
    onNext: () => void;
}

export interface RewardComponents {
    reward: number;
    rewardType: string;
    onNext: () => void;
}

export interface LegendaryOfferComponent {
    onNext: () => void;
}

export interface ButtonComponent {
    title: string;
    className?: string;
    isHidden?: boolean;
    onClick: () => void;
    disabled?: boolean;
}

export interface PrimaryButtonComponent {
    title: string;
    isHidden?: boolean;
    onClick: () => void;
    disabled?: boolean;
}

export interface SecondaryButtonComponent {
    title: string;
    isHidden?: boolean;
    onClick: () => void;
    disabled?: boolean;
}

export interface QuestionButtonComponent {
    className: string;
    question: QuestionDTO | null;
    disabled: boolean;
    title: string;
}

export interface QuestionButtonBlockComponent {
    questions: QuestionDTO[];
    correctQuestions: QuestionDTO[];
    isWrong: boolean;
}

export interface AnswerButtonComponent {
    className: string;
    answer: AnswerDTO | null;
    disabled: boolean;
    title: string;
}

export interface AnswerButtonBlockComponent {
    answers: AnswerDTO[];
    correctAnswers: AnswerDTO[];
    isWrong: boolean;
}

export interface ExerciseButtonBarComponent {
    isVerified: boolean;
    resultTitle: string;
    rightAnswer: AnswerDTO | null | undefined;
    checkAnswerHandler: () => void;
    continueHandler: () => void;
}

export interface DialogComponent {
    onClose: () => void;
    onClick?: () => void;
    isShown?: boolean;
}

export interface VBucksBlockComponent {
    vBucks: number;
}

export interface authBtnComponent {
    path: string;
    title: string;
}

export interface primaryBtnComponent {
    title: string;
    onClick: (data?: any) => void;
}

export interface socialBtnComponent {
    title: string;
    social: string;
    alt: string;
}

export interface showPassBtnComponent {
    onClick: () => void;
}

export interface returnBtnComponent {
    path: string;
    title: string;
}

export interface unitHeaderCardComponent {
    currentTopicOrder: number;
    currentUnit: UnitDTO | null;
}

export interface NavbarComponent {
    isHidden: boolean;
}

export interface SidebarComponent {
    isHidden: boolean;
}
