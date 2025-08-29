import { useSelector } from "react-redux";
import getQuestionButtonClass from "../../helpers/getQuestionButtonClass";
import type { QuestionButtonBlockComponent } from "../../types/componentTypes";
import QuestionButton from "../buttons/QuestionButton";
import { selectSelectedQuestion } from "../../slices/lessonProgressSlice";

export default function QuestionButtonBlock({ questions, correctQuestions, isWrong }: QuestionButtonBlockComponent) {
    const selectedQuestion = useSelector(selectSelectedQuestion);

    return questions.map((question) => (
        <QuestionButton
            key={question.id}
            className={getQuestionButtonClass(correctQuestions, question, isWrong, selectedQuestion)}
            question={question}
            disabled={correctQuestions.includes(question)}
            title={question.title}
        />
    ));
}
