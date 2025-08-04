import { useEffect, useState } from "react";
import type { LevelDTO } from "../../DTOs/levelDTO";
import { LevelService } from "../../services/levelService";
import type { levelNodesComponent } from "../../types/componentTypes";
import LevelNode from "./levelNode";

export default function LevelNodes({ unitId, unitCompletedCount }: levelNodesComponent) {
    const [levels, setLevels] = useState<LevelDTO[]>([]);

    useEffect(() => {
        const getLevels = async () => {
            const data = await LevelService.getAllByUnitId(unitId);

            setLevels(data);
        };

        getLevels();
    }, []);

    return (
        <div className="level-container">
            {levels.map((level) => (
                <LevelNode
                    key={level.id}
                    id={level.id}
                    title={level.title}
                    unitCompletedCount={unitCompletedCount}
                    currentLevel={1}
                    levelAmount={levels.length}
                />
            ))}
        </div>
    );
}
