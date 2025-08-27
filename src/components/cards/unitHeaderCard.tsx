import { useState } from "react";

export default function UnitHeaderCard() {
    const [currentTopicOrder, setCurrentTopicOrder] = useState<number>(1);
    const [currentUnitOrder, setCurrentUnitOrder] = useState<number>(1);
    const [currentUnit, setCurrentUnit] = useState<string>("February Uprising In Ukraine");

    return (
        <div className="unit-header-card">
            <div className="current-path">
                <img className="current-path__icon" src="../src/assets/icons/arrow-left.png" />
                <h3 className="current-path__title">{`Topic ${currentTopicOrder}, Unit ${currentUnitOrder}`}</h3>
            </div>
            <div className="unit-header">
                <h2 className="unit-header__title">{currentUnit}</h2>
                <div className="unit-header__guidebook-btn">
                    <img className="guidebook-btn__icon" src="../src/assets/icons/guidebook.png" />
                    <p className="guidebook-btn__title">Guidebook</p>
                </div>
            </div>
        </div>
    );
}
