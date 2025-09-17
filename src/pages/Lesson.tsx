import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import type { ExerciseDTO } from "../DTOs/exerciseDTO";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentLessonId, selectHearts, takeHeart } from "../slices/userStatisticsSlice";
import type { LessonDTO } from "../DTOs/lessonDTO";
import { LessonService } from "../services/lessonService";
import ExerciseService from "../services/exerciseService";
import {
    addRightAnswer,
    addWrongAnswer,
    nextExercise,
    selectAnswer,
    selectCurrentExercise,
    selectExerciseAmount,
    selectIsNextExercise,
    selectQuestion,
    selectRightAnswers,
    selectSelectedAnswer,
    selectSelectedQuestion,
    selectWrongAnswers,
    setExerciseAmount,
    setIsLastLesson,
    setLessonProgressToDefault,
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
import { UserExerciseMistakeService } from "../services/userProgress/userExerciseMistakeService";
import type {
    CreateUserExerciseMistakeDTO,
    UserExerciseMistakeDTO,
} from "../DTOs/userProgressDTO/userExerciseMistakeDTO";
import { selectUserData } from "../slices/authSlice";

export default function Lesson() {
    const dispatch = useDispatch();
    const { unitId, legendaryId } = useParams();
    const location = useLocation();
    const isPractice = location.pathname.includes("practice");
    const [lesson, setLesson] = useState<LessonDTO | null>(null);
    const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
    const [userExerciseMistakes, setUserExerciseMistakes] = useState<UserExerciseMistakeDTO[]>([]);
    const [questions, setQuestions] = useState<QuestionDTO[]>([]);
    const [answers, setAnswers] = useState<AnswerDTO[]>([]);
    const currentLessonId = useSelector(selectCurrentLessonId);
    const currentExercise = useSelector(selectCurrentExercise);
    const exerciseAmount = useSelector(selectExerciseAmount);
    const rightAnswers = useSelector(selectRightAnswers);
    const wrongAnswers = useSelector(selectWrongAnswers);
    const isExercise = useSelector(selectIsNextExercise);
    const selectedQuestion = useSelector(selectSelectedQuestion);
    const selectedAnswer = useSelector(selectSelectedAnswer);
    const isLessonTopBottomRowsHidden = useSelector(selectIsLessonTopBottomRowsHidden);
    const hearts = useSelector(selectHearts);
    const [exercise, setExercise] = useState<ExerciseDTO | null>(null);
    const [exerciseType, setExerciseType] = useState<number>(0);
    const [repeatExercises, setRepeatExercises] = useState<ExerciseDTO[]>([]);
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [resultTitle, setResultTitle] = useState<string>("Incorrect");
    const [rightAnswer, setRightAnswer] = useState<AnswerDTO | null>();
    const [correctQuestions, setCorrectQuestions] = useState<QuestionDTO[]>([]);
    const [correctAnswers, setCorrectAnswers] = useState<AnswerDTO[]>([]);
    const [isWrong, setIsWrong] = useState<boolean>(false);
    const [isHeartsRanOutDialogShown, setIsHeartsRanOutDialogShown] = useState<boolean>(false);
    const [isKeepLearningDialogShown, setIsKeepLearningDialogShown] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const user = useSelector(selectUserData);

    useEffect(() => {
        dispatch(setLessonProgressToDefault());
    }, []);

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

        if (isPractice) {
            dispatch(setType({ type: "practice" }));
        }

        if (unitId && legendaryId) {
            dispatch(setType({ type: "legendary" }));
        }
    }, []);

    useEffect(() => {
        if (isPractice) return;

        const getExercises = async () => {
            if (!lesson) return;

            const data = await ExerciseService.getAllByLessonId(lesson.id);

            setExercises(data);
            setExercise(data[currentExercise]);
            setExerciseType(data[currentExercise].exerciseTypeId);

            dispatch(setExerciseAmount({ exerciseAmount: data.length }));
        };

        getExercises();
    }, [lesson, isPractice]);

    useEffect(() => {
        if (!isPractice) return;

        const getExerciseMistakesAndExercises = async () => {
            const exerciseMistakesData = await UserExerciseMistakeService.getAll();

            if (!exerciseMistakesData) return;

            const exercisesData = await Promise.all(
                exerciseMistakesData.map((exerciseMistake) => ExerciseService.getById(exerciseMistake.exerciseId))
            );

            setUserExerciseMistakes(exerciseMistakesData);

            const data = exercisesData.filter((e): e is ExerciseDTO => e !== null);

            setExercises(data);
            setExercise(data[currentExercise]);
            setExerciseType(data[currentExercise].exerciseTypeId);

            dispatch(setExerciseAmount({ exerciseAmount: data.length }));
        };

        getExerciseMistakesAndExercises();
    }, []);

    useEffect(() => {
        if (!exercise) return;

        const getQuestionsAndAnswers = async () => {
            const fetchedQuestions = await QuestionService.getAllByExercise(exercise.id);

            if (fetchedQuestions.length === 1) {
                dispatch(selectQuestion({ selectedQuestion: fetchedQuestions[0] }));
            }

            setQuestions(fetchedQuestions);

            const answersArrays = await Promise.all(
                fetchedQuestions.map((question) => AnswerService.getAllByQuestionId(question.id))
            );

            const fetchedAnswers = answersArrays.flat();

            setAnswers(fetchedAnswers);
            setIsVisible(true);
        };

        getQuestionsAndAnswers();
    }, [exercise]);

    useEffect(() => {
        if (exercises.length === 0) return;

        setTimeout(() => setExercise(exercises[currentExercise]), 300);
        setTimeout(() => setExerciseType(exercises[currentExercise].exerciseTypeId), 300);
    }, [currentExercise, exercises]);

    useEffect(() => {
        if (answers && answers.length > 0) {
            const correct = answers.find((a) => a.isCorrect);
            if (correct) setRightAnswer(correct);
        }
    }, [answers]);

    const checkAnswerHandler = async () => {
        if (!selectedQuestion || !selectedAnswer) return;

        if (!selectedAnswer.isCorrect || selectedQuestion.id !== selectedAnswer.questionId) {
            dispatch(takeHeart());
            setResultTitle("Incorrect answer:");
            setIsWrong(true);

            const exerciseMistake: CreateUserExerciseMistakeDTO = {
                userId: user!.id,
                exerciseId: exercise!.id,
                userAnswer: selectedAnswer.title,
            };

            await UserExerciseMistakeService.addMistake(exerciseMistake);

            if (exercise?.exerciseTypeId === 1) {
                setRepeatExercises([...repeatExercises, exercise!]);
                setExercises((prev) => [...prev, exercise!]);
                dispatch(addWrongAnswer());

                dispatch(setExerciseAmount({ exerciseAmount: exercises.length + 1 }));
            } else if (exercise?.exerciseTypeId === 2) {
                setRepeatExercises([...repeatExercises, exercise!]);
                setExercises((prev) => [...prev, exercise!]);
                dispatch(setExerciseAmount({ exerciseAmount: exercises.length + 1 }));
            }
        } else {
            if (exercise?.exerciseTypeId === 1) {
                dispatch(addRightAnswer());

                if (isPractice) {
                    await UserExerciseMistakeService.removeMistake(userExerciseMistakes[currentExercise].id);
                }
            } else if (exercise?.exerciseTypeId === 2) {
                if (questions.length === correctQuestions.length + 1 && answers.length === correctAnswers.length + 1) {
                    dispatch(addRightAnswer());

                    if (isPractice) {
                        await UserExerciseMistakeService.removeMistake(userExerciseMistakes[currentExercise].id);
                    }
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
        if (
            (exerciseType === 2 && correctQuestions.length === 4 && correctAnswers.length === 4) ||
            exerciseType === 1
        ) {
            setTimeout(() => {
                dispatch(nextExercise());
                clearSelection();

                setCorrectAnswers([]);
                setCorrectQuestions([]);

                setIsWrong(false);
                setIsVerified(false);

                if (isExercise) {
                    setIsVisible(false);
                }
            }, 100);
        }
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
                                    width: exerciseAmount
                                        ? `${(100 / exerciseAmount) * (rightAnswers + wrongAnswers)}%`
                                        : "0%",
                                }}
                            ></div>
                        </div>

                        <div className="heart-container">
                            <img className="heart-icon" src="/src/assets/icons/heart.png" />
                            <p className="heart-value">{hearts}</p>
                        </div>
                    </div>

                    <div className={`lesson-content  ${isVisible ? "fade-in" : "fade-out"}`}>
                        {exerciseType === 2 ? <h1 className="exercise-title">{exercise?.title}</h1> : null}

                        <div
                            className="exercise"
                            style={{
                                flexDirection: exerciseType === 1 ? "column" : "row",
                            }}
                        >
                            <div className="questions">
                                {exerciseType === 1 ? (
                                    <h2 className="question-title">{questions[0]?.title}</h2>
                                ) : (
                                    <QuestionButtonBlock
                                        questions={questions}
                                        correctQuestions={correctQuestions}
                                        isWrong={isWrong}
                                    />
                                )}
                            </div>

                            <div className={exerciseType === 1 ? "answers-row" : "answers-column"}>
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
