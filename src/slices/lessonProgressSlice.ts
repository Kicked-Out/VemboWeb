import { createSlice } from "@reduxjs/toolkit";
import type { QuestionDTO } from "../DTOs/questionDTO";
import type { AnswerDTO } from "../DTOs/answerDTO";

interface LessonProgressSlice {
    startedAt: string;
    finishedAt: string;
    currentExercise: number;
    rightAnswers: number;
    exerciseAmount: number;
    isNextExercise: boolean;
    type: string;
    isLastLesson: boolean;
    selectedQuestion: QuestionDTO | null;
    selectedAnswer: AnswerDTO | null;
    isLessonProgress: boolean;
}

const initialState: LessonProgressSlice = {
    startedAt: new Date().toISOString(),
    finishedAt: new Date().toISOString(),
    currentExercise: 0,
    rightAnswers: 0,
    exerciseAmount: 0,
    isNextExercise: true,
    type: "lesson",
    isLastLesson: false,
    selectedQuestion: null,
    selectedAnswer: null,
    isLessonProgress: false,
};

export const LessonProgressSlice = createSlice({
    name: "lessonProgress",
    initialState,
    reducers: {
        setStartedTime: (state, action) => {
            state.startedAt = action.payload.startedAt;
        },

        setFinishedTime: (state, action) => {
            state.finishedAt = action.payload.finishedAt;
        },

        nextExercise: (state) => {
            if (state.currentExercise + 2 == state.exerciseAmount) {
                state.isNextExercise = false;
            } else {
                state.currentExercise += 1;
                state.isNextExercise = true;
            }
        },

        addRightAnswer: (state) => {
            state.rightAnswers += 1;
        },

        setExerciseAmount: (state, action) => {
            state.exerciseAmount = action.payload.exerciseAmount;
        },

        setType: (state, action) => {
            state.type = action.payload.type;
        },

        setIsLastLesson: (state, action) => {
            state.isLastLesson = action.payload.isLastLesson;
        },

        selectQuestion: (state, action) => {
            state.selectedQuestion = action.payload.selectedQuestion;
        },

        selectAnswer: (state, action) => {
            state.selectedAnswer = action.payload.selectedAnswer;
        },

        setIsLessonProgress: (state, action) => {
            state.isLessonProgress = action.payload.isLessonProgress;
        },
    },
    selectors: {
        selectStartedAt: (x) => x.startedAt,
        selectFinishedAt: (x) => x.finishedAt,
        selectCurrentExercise: (x) => x.currentExercise,
        selectRightAnswers: (x) => x.rightAnswers,
        selectExerciseAmount: (x) => x.exerciseAmount,
        selectIsNext: (x) => x.isNextExercise,
        selectType: (x) => x.type,
        selectIsLastLesson: (x) => x.isLastLesson,
        selectSelectedQuestion: (x) => x.selectedQuestion,
        selectSelectedAnswer: (x) => x.selectedAnswer,
        selectIsLessonProgress: (x) => x.isLessonProgress,
    },
});

export const {
    setStartedTime,
    setFinishedTime,
    nextExercise,
    addRightAnswer,
    setExerciseAmount,
    setType,
    setIsLastLesson,
    selectQuestion,
    selectAnswer,
    setIsLessonProgress,
} = LessonProgressSlice.actions;
export const {
    selectStartedAt,
    selectFinishedAt,
    selectCurrentExercise,
    selectRightAnswers,
    selectExerciseAmount,
    selectIsNext,
    selectType,
    selectIsLastLesson,
    selectSelectedQuestion,
    selectSelectedAnswer,
    selectIsLessonProgress,
} = LessonProgressSlice.selectors;

export default LessonProgressSlice.reducer;
