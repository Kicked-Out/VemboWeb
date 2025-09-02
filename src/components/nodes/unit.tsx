import { useEffect, useRef, useState } from "react";
import type { UserUnitProgressDTO } from "../../DTOs/userProgressDTO/userUnitProgressDTO";
import type { UnitComponent } from "../../types/componentTypes";
import LevelNodes from "./levelNodes";
import { UserUnitProgressService } from "../../services/userProgress/userUnitProgressService";

export default function Unit({ unit, topicCompletedCount, onUnitInView }: UnitComponent) {
    const [userUnitProgress, setUserUnitProgress] = useState<UserUnitProgressDTO | null>(null);

    useEffect(() => {
        if (topicCompletedCount === undefined || topicCompletedCount > 0) return;

        const getUserUnitProgress = async () => {
            const data = await UserUnitProgressService.getByUnitId(unit.id);

            setUserUnitProgress(data);
        };

        getUserUnitProgress();
    }, []);

    const unitRef = useRef<HTMLDivElement>(null);
    const viewportHeight = window.innerHeight;
    const topMargin = -200;
    const bottomMargin = -(viewportHeight - 250);
    const margin = `${topMargin}px 0px ${bottomMargin}px 0px`;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        onUnitInView(unit);
                    }
                });
            },
            {
                threshold: 0,
                root: null, // viewport
                rootMargin: margin,
            }
        );

        if (unitRef.current) observer.observe(unitRef.current);

        return () => {
            if (unitRef.current) observer.unobserve(unitRef.current);
        };
    }, [unit.id]);

    const completedCount =
        topicCompletedCount === undefined || topicCompletedCount > 0
            ? topicCompletedCount
            : userUnitProgress?.completedCount;

    return (
        <div ref={unitRef} className="unit">
            <div className="unit-title-container">
                <hr className="unit-title-container__hr" />
                <h2 className="unit-title-container__h2">{unit.title}</h2>
                <hr className="unit-title-container__hr" />
            </div>

            <LevelNodes unitId={unit.id} unitCompletedCount={completedCount} />
        </div>
    );
}
