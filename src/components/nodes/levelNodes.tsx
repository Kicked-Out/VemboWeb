import { useEffect, useRef, useState } from "react";
import type { LevelDTO } from "../../DTOs/levelDTO";
import { LevelService } from "../../services/levelService";
import type { levelNodesComponent } from "../../types/componentTypes";
import LevelNode from "./levelNode";

export default function LevelNodes({ unitId, unitCompletedCount }: levelNodesComponent) {
    const [levels, setLevels] = useState<LevelDTO[]>([]);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const getLevels = async () => {
            const data = await LevelService.getAllByUnitId(unitId);

            setLevels(data);

            setTotal(data.length);
        };

        getLevels();
    }, []);

    const [containerSize, setContainerSize] = useState<{ width: number }>({ width: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            const rect = entries[0].contentRect;
            setContainerSize({ width: rect.width });
        });

        resizeObserver.observe(containerRef.current);

        return () => resizeObserver.disconnect();
    }, []);

    let direction = unitId % 2 === 0 ? 1 : -1;

    let radius = 63 * direction;
    let centerX = 0;
    let iterator = 0;

    const startAngle = -90;
    const endAngle = 90;

    const levelPositions = Array.from({ length: total }, (_, i) => {
        if (i === 0 || i === total - 1) return 0;

        if (i % 3 === 0) {
            radius *= -1;
            iterator = 0;
        } else {
            iterator += 1;
        }

        const angle = startAngle + (iterator / (total - 1)) * (endAngle - startAngle);
        const rad = (angle * Math.PI) / 180;
        const x = centerX + radius * Math.cos(rad);

        return x;
    });

    return (
        <div ref={containerRef} className="level-container">
            {levels.map((level, i) => (
                <LevelNode
                    key={level.id}
                    id={level.id}
                    x={levelPositions[i]}
                    title={level.title}
                    levelTypeId={level.levelTypeId}
                    unitCompletedCount={unitCompletedCount}
                    currentLevel={1}
                    levelAmount={levels.length}
                />
            ))}
        </div>
    );
}
