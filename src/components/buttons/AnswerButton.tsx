import { useDispatch, useSelector } from "react-redux";
import type { AnswerButtonComponent } from "../../types/componentTypes";
import { selectAnswer, selectSelectedAnswer } from "../../slices/lessonProgressSlice";
import Button from "./Button";

export default function AnswerButton({ className, answer, disabled, title }: AnswerButtonComponent) {
    const dispatch = useDispatch();
    const selectedAnswer = useSelector(selectSelectedAnswer);

    const onClickHandler = () => {
        if (selectedAnswer === answer) {
            dispatch(selectAnswer({ selectedAnswer: null }));
        } else {
            dispatch(selectAnswer({ selectedAnswer: answer }));
        }
    };

    return <Button title={title} className={className} onClick={onClickHandler} disabled={disabled} />;
}
