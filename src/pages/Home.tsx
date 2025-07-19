import { Link, Links } from "react-router-dom";
import { useEffect, useState } from "react";
import type { AnswerDTO } from "../DTOs/answerDTO";
import { AnswerService } from "../services/answerService";
import { LevelService } from "../services/levelService";
import type { LevelDTO } from "../DTOs/levelDTO";
import { LessonService } from "../services/lessonService";
import type { LessonDTO } from "../DTOs/lessonDTO";
import type { TopicDTO } from "../DTOs/topicDTO";
import TopicService from "../services/topicService";
import type { UnitDTO } from "../DTOs/unitDTO";
import { UnitService } from "../services/unitService";
import { PeriodService } from "../services/periodService";

export default function Home() {
    const [units, setUnits] = useState<UnitDTO[]>([]);

    useEffect(() => {
        const getUnits = async () => {
            const data = await UnitService.getAll();

            console.log("Fetched units:", data);

            setUnits(data);
        };

        getUnits();
    }, []);

    const [levels, setLevels] = useState<LevelDTO[]>([]);

    useEffect(() => {
        const getLevels = async () => {
            const data = await LevelService.getAll();

            console.log("Fetched levels:", data);

            setLevels(data);
        };

        getLevels();
    }, []);

    const [btnActive, setBtnActive] = useState<boolean>(false);
    const [btnActiveId, setBtnActiveId] = useState<number>(0);

    const btnPressHandler = (id: number) => {
        console.log("clicked!");
        setBtnActiveId(id);
        setBtnActive(!btnActive);
    };

    return (
        <div>
            {units.map((unit) => (
                <div key={unit.id} className="unit">
                    <h2>
                        Topic {unit.id}: {unit.title}
                    </h2>
                    <p>{unit.description}</p>
                    {levels.map((level) => (
                        <div key={level.id} className="level-container">
                            <div
                                className="start-btn"
                                onClick={() => {
                                    btnPressHandler(level.id);
                                }}
                            >
                                Crystal
                            </div>

                            <div className={btnActive && level.id === btnActiveId ? "level-content" : "hidden"}>
                                {level.title}
                                <p>Level 1 of 4</p>
                                <Link to="/lesson" className="play-btn">
                                    Start +10 XP
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
