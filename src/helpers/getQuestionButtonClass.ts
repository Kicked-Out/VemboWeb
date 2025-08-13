import type { QuestionDTO } from "../DTOs/questionDTO";

export default function getQuestionButtonClass(
    correctQuestions: QuestionDTO[],
    question: QuestionDTO,
    isWrong: boolean,
    selectedQuestion: QuestionDTO | null
) {
    if (correctQuestions.includes(question)) return "right-question-btn";
    if (isWrong && selectedQuestion === question) return "wrong-question-btn";
    if (selectedQuestion === question) return "question-selected";

    return "question";
}
