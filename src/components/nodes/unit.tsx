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
            <h2>
                Unit {unit.id}: {unit.title}
            </h2>

            <LevelNodes unitId={unit.id} unitCompletedCount={completedCount} />
        </div>
    );
}
