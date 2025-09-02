import { useEffect, useState } from "react";
import type { unitHeaderCardComponent } from "../../types/componentTypes";

export default function UnitHeaderCard({ currentTopicOrder, currentUnit }: unitHeaderCardComponent) {
    // const [currentUnitOrder, setCurrentUnitOrder] = useState<number>(1);
    // const [currentUnit, setCurrentUnit] = useState<string>("February Uprising In Ukraine");
    const unitColors = [
        "#2EE6C3", // Mint
        "#A259FF", // Purple
        "#FFD500", // Yellow
        "#2EE6C3", // Mint
        "#FF6B6B", // Peach
        "#FFD500", // Yellow
        "#2EE6C3", // Mint
        "#A259FF", // Purple
        "#FF6B6B", // Peach
        "#2EE6C3", // Mint
        "#FF6B6B", // Peach
        "#A259FF", // Purple
        "#2EE6C3", // Mint
        "#A259FF", // Purple
        "#FFD500", // Yellow
    ];
    let currentColorIndex = 0;

    if (currentUnit) {
        currentColorIndex = (currentUnit.id - 1) % unitColors.length;
    }

    const currentColor = unitColors[currentColorIndex];

    return (
        <div className="unit-header-card__container">
            <div className="unit-header-card__shadow" />
            <div className="unit-header-card" style={{ backgroundColor: currentColor }}>
                <div className="current-path">
                    <img className="current-path__icon" src="../src/assets/icons/arrow-left.png" />
                    <h3 className="current-path__title">{`Topic ${currentTopicOrder}, Unit ${currentUnit?.order}`}</h3>
                </div>
                <div className="unit-header">
                    <h2 className="unit-header__title">{currentUnit?.title}</h2>
                    <div className="unit-header__guidebook-btn">
                        <img className="guidebook-btn__icon" src="../src/assets/icons/guidebook.png" />
                        <p className="guidebook-btn__title">Guidebook</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
