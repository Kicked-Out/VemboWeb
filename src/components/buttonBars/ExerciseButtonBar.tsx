import type { ExerciseButtonBarComponent } from "../../types/componentTypes";
import Button from "../buttons/Button";

export default function ExerciseButtonBar({
    isVerified,
    resultTitle,
    rightAnswer,
    disabled,
    checkAnswerHandler,
    continueHandler,
}: ExerciseButtonBarComponent) {
    const isRight = resultTitle === "Nice job!";

    return (
        <div className={`lesson-bar ${isVerified ? "verified-bar-color" : null}`}>
            <div className={`result-content ${!isVerified ? "collapsed" : null}`}>
                <div className={`result-icon-container ${isRight ? "right" : "wrong"}-result-color`}>
                    <img
                        className="result-icon"
                        src={`/src/assets/icons/lesson/${isRight ? "right" : "wrong"}_answer_icon.png`}
                    />
                </div>
                <div className="result-info">
                    <p className="result-title">{resultTitle}</p>
                    <p className="result-explanation">Explanation: {rightAnswer?.title}</p>

                    {/* <SecondaryButton title="Report" onClick={() => {}} /> */}

                    <div className="report-btn">
                        <p className="report-btn__title">Report</p>
                        <img className="report-btn__icon" src="/src/assets/icons/lesson/report_icon.png" />
                    </div>
                </div>
            </div>

            <Button
                disabled={disabled}
                className="check-btn"
                title="Check"
                isHidden={isVerified}
                onClick={checkAnswerHandler}
            />
            <Button
                className={`continue-btn continue-btn-${isRight ? "right" : "wrong"}-colors`}
                title="Continue"
                isHidden={!isVerified}
                onClick={continueHandler}
            />
        </div>
    );
}
