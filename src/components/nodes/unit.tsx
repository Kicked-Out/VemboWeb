import { useEffect, useState } from "react";
import type { UserUnitProgressDTO } from "../../DTOs/userProgressDTO/userUnitProgressDTO";
import type { UnitComponent } from "../../types/componentTypes";
import LevelNodes from "./levelNodes";
import { UserUnitProgressService } from "../../services/userProgress/userUnitProgressService";

export default function Unit({ unit, topicCompletedCount }: UnitComponent) {
    const [userUnitProgress, setUserUnitProgress] = useState<UserUnitProgressDTO | null>(null);

    useEffect(() => {
        if (topicCompletedCount === undefined || topicCompletedCount > 0) return;

        const getUserUnitProgress = async () => {
            const data = await UserUnitProgressService.getByUnitId(unit.id);

            setUserUnitProgress(data);
        };

        getUserUnitProgress();
    }, []);

    const completedCount =
        topicCompletedCount === undefined || topicCompletedCount > 0
            ? topicCompletedCount
            : userUnitProgress?.completedCount;

    return (
        <div className="unit">
            <div className="unit-title-container">
                <hr className="unit-title-container__hr" />
                <h2 className="unit-title-container__h2">{unit.title}</h2>
                <hr className="unit-title-container__hr" />
            </div>

            <LevelNodes unitId={unit.id} unitCompletedCount={completedCount} />
        </div>
    );
}
