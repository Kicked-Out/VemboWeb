import { useEffect, useState } from "react";
import type { UnitDTO } from "../../DTOs/unitDTO";
import { UnitService } from "../../services/unitService";
import Unit from "../nodes/unit";
import type { UnitContainerComponent } from "../../types/componentTypes";
import type { UserTopicProgressDTO } from "../../DTOs/userProgressDTO/userTopicProgressDTO";
import { UserTopicProgressService } from "../../services/userProgress/userTopicProgressService";
import TopicService from "../../services/topicService";
import { useDispatch, useSelector } from "react-redux";
import { resetUnitLoaded, selectUnitLoaded } from "../../slices/menuSlice";

export default function UnitContainer({
    periodId,
    periodCompletedCount,
    onUnitInView,
    updateCurrentTopicOrder,
}: UnitContainerComponent) {
    const dispatch = useDispatch();
    const [userTopicProgress, setUserTopicProgress] = useState<UserTopicProgressDTO | null>(null);

    useEffect(() => {
        dispatch(resetUnitLoaded());
    }, []);

    useEffect(() => {
        if (periodCompletedCount === undefined) return;
        if (periodCompletedCount > 0) return;
        if (periodId === 0) return;

        const getUserTopicProgress = async () => {
            const data = await UserTopicProgressService.getCurrentByPeriodId(periodId);

            if (!data) return;

            setUserTopicProgress(data);

            const topicData = await TopicService.getById(data.topicId);

            if (!topicData) return;

            updateCurrentTopicOrder(topicData.id);
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

    const unitLoaded = useSelector(selectUnitLoaded);

    return (
        <div
            className={`unit-container ${
                units.length * 2 === unitLoaded && units.length !== 0 && unitLoaded !== 0 ? "fade-in" : "fade-out"
            }`}
        >
            {units.map((unit) => (
                <Unit key={unit.id} unit={unit} topicCompletedCount={topicCompletedCount} onUnitInView={onUnitInView} />
            ))}
        </div>
    );
}
