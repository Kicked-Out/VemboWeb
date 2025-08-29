import type { AnswerDTO } from "../DTOs/answerDTO";

export default function getAnswerButtonClass(
    correctAnswers: AnswerDTO[],
    answer: AnswerDTO,
    isWrong: boolean,
    selectedAnswer: AnswerDTO | null
) {
    if (correctAnswers.includes(answer)) return "right-answer-btn";
    if (isWrong && selectedAnswer === answer) return "wrong-answer-btn";
    if (selectedAnswer === answer) return "answer-selected";

    return "answer";
}
