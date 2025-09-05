import InsightButton from "../../buttons/InsightButton";

export default function InsightCard() {
    return (
        <div className="insight-card">
            <div className="insight-card__block">
                <div className="insight-card__content">
                    <img className="insight-card__img" src="/src/assets/icons/insight/insight_icon.png" />
                    <h2 className="insight-card__title">Level Up With Insight</h2>
                    <p className="insight-card__info">Deeper Dives, Smarter Practice, And An Ad-Free Experience!</p>
                </div>

                <img className="insight-card__bear-img" src="/src/assets/icons/insight/vembo-insight-card.png" />
            </div>

            <InsightButton />
        </div>
    );
}
