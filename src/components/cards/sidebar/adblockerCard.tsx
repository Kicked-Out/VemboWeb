import InsightPrimaryButton from "../../buttons/InsightPrimaryButton";
import InsightSecondaryButton from "../../buttons/InsightSecondaryButton";

export default function AdBlockerCard() {
    return (
        <div className="adblocker-card">
            <img className="adblocker-card__img" src="src/assets/icons/adblocker/bear.png" />

            <div className="adblocker-card__content">
                <h2 className="adblocker-card__title">Using an ad blocker?</h2>

                <p className="adblocker-card__info">
                    Support education with Vembo Insight and we'll remove ads for you
                </p>
            </div>

            <InsightPrimaryButton />

            <InsightSecondaryButton />
        </div>
    );
}
