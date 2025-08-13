import { useSelector } from "react-redux";
import getAnswerButtonClass from "../../helpers/getAnswerButtonClass";
import type { AnswerButtonBlockComponent } from "../../types/componentTypes";
import AnswerButton from "../buttons/AnswerButton";
import { selectSelectedAnswer } from "../../slices/lessonProgressSlice";

export default function AnswerButtonBlock({ answers, correctAnswers, isWrong }: AnswerButtonBlockComponent) {
    const selectedAnswer = useSelector(selectSelectedAnswer);

    return answers.map((answer) => (
        <AnswerButton
            key={answer.id}
            className={getAnswerButtonClass(correctAnswers, answer, isWrong, selectedAnswer)}
            answer={answer}
            disabled={correctAnswers.includes(answer)}
            title={answer.title}
        />
    ));
}
