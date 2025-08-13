import type { LegendaryOfferComponent } from "../../types/componentTypes";

export default function LegendaryOffer({ onNext }: LegendaryOfferComponent) {
    return (
        <div>
            <img className="legendary-icon" />
            <h2 className="legendary-title">Prove you're a legend</h2>
            <p className="legendary-description">Complete this extra-hard challenge and level up to Legendary!</p>

            <button className="legendary-button">Start +40 XP</button>

            <div className="btn-bar align-right">
                <button className="primary-btn" onClick={onNext}>
                    Continue
                </button>
            </div>
        </div>
    );
}
