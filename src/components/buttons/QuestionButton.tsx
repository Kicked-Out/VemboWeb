import { useDispatch, useSelector } from "react-redux";
import type { QuestionButtonComponent } from "../../types/componentTypes";
import { selectQuestion, selectSelectedQuestion } from "../../slices/lessonProgressSlice";
import Button from "./Button";

export default function QuestionButton({ className, question, disabled, title }: QuestionButtonComponent) {
    const dispatch = useDispatch();
    const selectedQuestion = useSelector(selectSelectedQuestion);

    const onClickHandler = () => {
        if (selectedQuestion == question) {
            dispatch(selectQuestion({ selectedQuestion: null }));
        } else {
            dispatch(selectQuestion({ selectedQuestion: question }));
        }
    };

    return <Button title={title} className={className} onClick={onClickHandler} disabled={disabled} />;
}
