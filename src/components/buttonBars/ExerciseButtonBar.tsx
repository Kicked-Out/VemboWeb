import type { ExerciseButtonBarComponent } from "../../types/componentTypes";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

export default function ExerciseButtonBar({
    isVerified,
    resultTitle,
    rightAnswer,
    checkAnswerHandler,
    continueHandler,
}: ExerciseButtonBarComponent) {
    return (
        <div className="btn-bar align-right">
            <div className={`result-content ${!isVerified ? "hidden" : null}`}>
                <div className="result-icon"></div>
                <div className="result-info">
                    <p className="result-title">{resultTitle}</p>
                    <p className="result-correction">{rightAnswer?.title}</p>

                    <SecondaryButton title="Report" onClick={() => {}} />
                </div>
            </div>

            <PrimaryButton title="Check" isHidden={isVerified} onClick={checkAnswerHandler} />
            <PrimaryButton title="Continue" isHidden={!isVerified} onClick={continueHandler} />
        </div>
    );
}
