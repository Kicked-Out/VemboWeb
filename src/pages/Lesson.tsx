import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { ExerciseDTO } from "../DTOs/exerciseDTO";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentLessonId, selectHearts, takeHeart } from "../slices/userStatisticsSlice";
import type { LessonDTO } from "../DTOs/lessonDTO";
import { LessonService } from "../services/lessonService";
import ExerciseService from "../services/exerciseService";
import {
    addRightAnswer,
    nextExercise,
    selectAnswer,
    selectCurrentExercise,
    selectExerciseAmount,
    selectIsNext,
    selectQuestion,
    selectRightAnswers,
    selectSelectedAnswer,
    selectSelectedQuestion,
    setExerciseAmount,
    setIsLastLesson,
    setStartedTime,
    setType,
} from "../slices/lessonProgressSlice";
import type { QuestionDTO } from "../DTOs/questionDTO";
import { QuestionService } from "../services/questionService";
import { AnswerService } from "../services/answerService";
import type { AnswerDTO } from "../DTOs/answerDTO";
import LessonComplete from "./LessonComplete";
import QuestionButtonBlock from "../components/buttonBlocks/QuestionButtonBlock";
import AnswerButtonBlock from "../components/buttonBlocks/AnswerButtonBlock";
import ExerciseButtonBar from "../components/buttonBars/ExerciseButtonBar";
import HeartsRanOutDialog from "../components/dialogs/HeartsRanOutDialog";
import KeepLearningDialog from "../components/dialogs/KeepLearningDialog";
import {
    hideNavbar,
    hideSidebar,
    selectIsLessonTopBottomRowsHidden,
    showLessonTopBottomRows,
} from "../slices/menuSlice";

export default function Lesson() {
    const dispatch = useDispatch();
    const { unitId, levelId, legendaryId } = useParams();
    const [lesson, setLesson] = useState<LessonDTO | null>(null);
    const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
    const [questions, setQuestions] = useState<QuestionDTO[]>([]);
    const [answers, setAnswers] = useState<AnswerDTO[]>([]);
    const currentLessonId = useSelector(selectCurrentLessonId);
    const currentExercise = useSelector(selectCurrentExercise);
    const exerciseAmount = useSelector(selectExerciseAmount);
    const rightAnswers = useSelector(selectRightAnswers);
    const isExercise = useSelector(selectIsNext);
    const selectedQuestion = useSelector(selectSelectedQuestion);
    const selectedAnswer = useSelector(selectSelectedAnswer);
    const isLessonTopBottomRowsHidden = useSelector(selectIsLessonTopBottomRowsHidden);
    const hearts = useSelector(selectHearts);
    const [exercise, setExercise] = useState<ExerciseDTO | null>(null);
    const [repeatExercises, setRepeatExercises] = useState<ExerciseDTO[]>([]);
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [resultTitle, setResultTitle] = useState<string>("Incorrect");
    const [rightAnswer, setRightAnswer] = useState<AnswerDTO | null>();
    const [correctQuestions, setCorrectQuestions] = useState<QuestionDTO[]>([]);
    const [correctAnswers, setCorrectAnswers] = useState<AnswerDTO[]>([]);
    const [isWrong, setIsWrong] = useState<boolean>(false);
    const [isHeartsRanOutDialogShown, setIsHeartsRanOutDialogShown] = useState<boolean>(false);
    const [isKeepLearningDialogShown, setIsKeepLearningDialogShown] = useState<boolean>(false);

    useEffect(() => {
        dispatch(hideNavbar());
        dispatch(hideSidebar());
        dispatch(showLessonTopBottomRows());
    }, []);

    useEffect(() => {
        dispatch(setStartedTime({ startedAt: new Date().toISOString() }));
        dispatch(setIsLastLesson({ isLastLesson: false }));
    }, []);

    useEffect(() => {
        if (!unitId) {
            dispatch(setType({ type: "lesson" }));

            const getLesson = async () => {
                const data = await LessonService.getById(currentLessonId);

                setLesson(data);
            };

            getLesson();
        }
    }, []);

    if (unitId && levelId) {
        dispatch(setType({ type: "practice" }));
    }

    if (unitId && legendaryId) {
        dispatch(setType({ type: "legendary" }));
    }

    useEffect(() => {
        const getExercises = async () => {
            if (!lesson) return;

            const data = await ExerciseService.getAllByLessonId(lesson.id);

            setExercises(data);
            setExercise(data[currentExercise]);

            dispatch(setExerciseAmount({ exerciseAmount: data.length }));
        };

        getExercises();
    }, [lesson]);

    useEffect(() => {
        if (!exercise) return;

        const getQuestionsAndAnswers = async () => {
            const fetchedQuestions = await QuestionService.getAllByExercise(exercise.id);

            if (fetchedQuestions.length === 1) {
                dispatch(selectQuestion({ selectedQuestion: fetchedQuestions[0] }));
            }

            setQuestions(fetchedQuestions);

            const fetchedAnswers = [];

            for (const question of fetchedQuestions) {
                const fetchedAnswer = await AnswerService.getAllByQuestionId(question.id);

                fetchedAnswers.push(...fetchedAnswer);
            }

            setAnswers(fetchedAnswers);
        };

        getQuestionsAndAnswers();
    }, [exercise]);

    useEffect(() => {
        if (exercises.length === 0) return;

        setExercise(exercises[currentExercise]);
    }, [currentExercise, exercises]);

    useEffect(() => {
        if (answers && answers.length > 0) {
            const correct = answers.find((a) => a.isCorrect);
            if (correct) setRightAnswer(correct);
        }
    }, [answers]);

    const checkAnswerHandler = () => {
        if (!selectedQuestion || !selectedAnswer) return;

        const isAlreadyCorrectQuestion = correctQuestions.includes(selectedQuestion);
        const isAlreadyCorrectAnswer = correctAnswers.includes(selectedAnswer);

        const futureCorrectQuestionsLength = isAlreadyCorrectQuestion
            ? correctQuestions.length
            : correctQuestions.length + 1;

        const futureCorrectAnswersLength = isAlreadyCorrectAnswer ? correctAnswers.length : correctAnswers.length + 1;

        if (!selectedAnswer.isCorrect || selectedQuestion.id !== selectedAnswer.questionId) {
            dispatch(takeHeart());
            setResultTitle("Incorrect answer:");
            setIsWrong(true);

            if (exercise?.exerciseTypeId === 1) {
                setRepeatExercises([...repeatExercises, exercise!]);
                setExercises([...exercises, exercise!]);
                dispatch(setExerciseAmount({ exerciseAmount: exercises.length }));
            } else if (exercise?.exerciseTypeId === 2) {
                if (
                    questions.length === futureCorrectQuestionsLength &&
                    answers.length === futureCorrectAnswersLength
                ) {
                    setRepeatExercises([...repeatExercises, exercise!]);
                    setExercises([...exercises, exercise!]);
                    dispatch(setExerciseAmount({ exerciseAmount: exercises.length }));
                }
            }
        } else {
            if (exercise?.exerciseTypeId === 1) {
                dispatch(addRightAnswer());
            } else if (exercise?.exerciseTypeId === 2) {
                if (
                    questions.length === futureCorrectQuestionsLength &&
                    answers.length === futureCorrectAnswersLength
                ) {
                    dispatch(addRightAnswer());
                }
            }
            setResultTitle("Nice job!");

            setCorrectAnswers([...correctAnswers, selectedAnswer]);
            setCorrectQuestions([...correctQuestions, selectedQuestion]);
        }

        setIsVerified(true);
    };

    const clearSelection = () => {
        dispatch(selectAnswer({ selectedAnswer: null }));
        dispatch(selectQuestion({ selectedQuestion: null }));
    };

    const continueHandler = () => {
        dispatch(nextExercise());
        clearSelection();

        setCorrectAnswers([]);
        setCorrectQuestions([]);

        setIsWrong(false);
        setIsVerified(false);
    };

    useEffect(() => {
        if (!selectedAnswer || !selectedQuestion) return;
        if (exercise?.exerciseTypeId === 1) return;

        checkAnswerHandler();

        const timeout = setTimeout(() => {
            setIsWrong(false);
            clearSelection();
        }, 250);

        return () => clearTimeout(timeout);
    }, [selectedAnswer, selectedQuestion]);

    const onHeartsRanOutCloseDialogHandle = () => {
        setIsKeepLearningDialogShown(true);
        setIsHeartsRanOutDialogShown(false);
    };

    const onKeepLearningCloseDialogHandle = () => {
        setIsKeepLearningDialogShown(false);
    };

    const onHeartsRanOutClickDialogHandle = () => {
        setIsKeepLearningDialogShown(false);
        setIsHeartsRanOutDialogShown(!isHeartsRanOutDialogShown);
    };

    const gridTemplateRows = isLessonTopBottomRowsHidden ? "115px 1fr 225px" : "1fr";

    return (
        <div className="lesson-container" style={{ gridTemplateRows: `${gridTemplateRows}` }}>
            {isExercise ? (
                <>
                    <div className="lesson-progress-container">
                        <Link to={"/"}>
                            <img className="lesson-progress-bar-icon" src="/src/assets/icons/lesson/cross.png" />
                        </Link>

                        <div className="lesson-progress-bar">
                            <div
                                className="lesson-progress"
                                style={{
                                    // width: exerciseAmount ? `${(rightAnswers / exerciseAmount) * 100}%` : "0%",
                                    width: "50%",
                                }}
                            ></div>
                        </div>

                        <div className="heart-container">
                            <img className="heart-icon" src="/src/assets/icons/heart.png" />
                            <p className="heart-value">{hearts}</p>
                        </div>
                    </div>

                    <div className="lesson-content">
                        {exercise && exercise.exerciseTypeId === 2 ? (
                            <h1 className="exercise-title">{exercise?.title}</h1>
                        ) : null}

                        <div
                            className="exercise"
                            style={{
                                flexDirection: exercise && exercise.exerciseTypeId === 1 ? "column" : "row",
                            }}
                        >
                            <div className="questions">
                                {exercise && exercise.exerciseTypeId === 1 ? (
                                    <h2 className="question-title">{questions[0]?.title}</h2>
                                ) : (
                                    <QuestionButtonBlock
                                        questions={questions}
                                        correctQuestions={correctQuestions}
                                        isWrong={isWrong}
                                    />
                                )}
                            </div>

                            <div
                                className={exercise && exercise.exerciseTypeId === 1 ? "answers-row" : "answers-column"}
                            >
                                <div className="answers-line">
                                    <AnswerButtonBlock
                                        answers={answers.slice(0, 2)}
                                        correctAnswers={correctAnswers}
                                        isWrong={isWrong}
                                    />
                                </div>

                                <div className="answers-line">
                                    <AnswerButtonBlock
                                        answers={answers.slice(2, 4)}
                                        correctAnswers={correctAnswers}
                                        isWrong={isWrong}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <ExerciseButtonBar
                        isVerified={isVerified}
                        resultTitle={resultTitle}
                        rightAnswer={rightAnswer}
                        disabled={!selectedQuestion || !selectedAnswer}
                        checkAnswerHandler={checkAnswerHandler}
                        continueHandler={continueHandler}
                    />

                    <HeartsRanOutDialog onClose={onHeartsRanOutCloseDialogHandle} isShown={isHeartsRanOutDialogShown} />
                    <KeepLearningDialog
                        onClose={onKeepLearningCloseDialogHandle}
                        isShown={isKeepLearningDialogShown}
                        onClick={onHeartsRanOutClickDialogHandle}
                    />
                </>
            ) : (
                <LessonComplete />
            )}
        </div>
    );
}
