import { useEffect, useState } from "react";
import type { UnitDTO } from "../../DTOs/unitDTO";
import { UnitService } from "../../services/unitService";
import Unit from "../nodes/unit";
import type { UnitContainerComponent } from "../../types/componentTypes";
import type { UserTopicProgressDTO } from "../../DTOs/userProgressDTO/userTopicProgressDTO";
import { UserTopicProgressService } from "../../services/userProgress/userTopicProgressService";

export default function UnitContainer({ periodId, periodCompletedCount }: UnitContainerComponent) {
    const [userTopicProgress, setUserTopicProgress] = useState<UserTopicProgressDTO | null>(null);

    useEffect(() => {
        if (periodCompletedCount === undefined) return;
        if (periodCompletedCount > 0) return;

        const getUserTopicProgress = async () => {
            const data = await UserTopicProgressService.getCurrentByPeriodId(periodId);

            setUserTopicProgress(data);
        };

        getUserTopicProgress();
    }, [periodId, periodCompletedCount]);

    const [units, setUnits] = useState<UnitDTO[]>([]);

    useEffect(() => {
        const getUnits = async () => {
            if (!userTopicProgress) return;

            const data = await UnitService.getAllByTopicId(userTopicProgress.topicId);

            setUnits(data);
        };

        getUnits();
    }, [userTopicProgress, periodCompletedCount]);

    const topicCompletedCount =
        periodCompletedCount === undefined || periodCompletedCount > 0
            ? periodCompletedCount
            : userTopicProgress?.completedCount;

    return (
        <div className="unit-container">
            {units.map((unit) => (
                <Unit key={unit.id} unit={unit} topicCompletedCount={topicCompletedCount} />
            ))}
        </div>
    );
}
