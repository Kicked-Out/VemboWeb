import { Link } from "react-router-dom";
// import { PeriodService } from "../services/periodService";
import { useEffect, useState } from "react";
import type { AnswerDTO } from "../DTOs/answerDTO";
import { AnswerService } from "../services/answerService";
// import type { PeriodDTO } from "../DTOs/periodDTO";
// import { LevelService } from "../services/levelService";
// import type { LevelDTO } from "../DTOs/levelDTO";
// import { LessonService } from "../services/lessonService";
// import type { LessonDTO } from "../DTOs/lessonDTO";
// import ExerciseService from "../services/exerciseService";
// import type { ExerciseDTO } from "../DTOs/exerciseDTO";
// import type { TopicDTO } from "../DTOs/topicDTO";
// import TopicService from "../services/topicService";
// import type { QuestionDTO } from "../DTOs/questionDTO";
// import { QuestionService } from "../services/questionService";
// import type { UnitDTO } from "../DTOs/unitDTO";
// import { UnitService } from "../services/unitService";

export default function Home() {
    // PeriodService Usage Example

    // Get All Periods
    // const [periods, setPeriods] = useState<PeriodDTO[]>([]);

    // useEffect(() => {
    //     const fetchPeriods = async () => {
    //         const data = await PeriodService.getAll();
    //         console.log("Fetched periods:", data);

    //         setPeriods(data);
    //     };

    //     fetchPeriods();
    // }, []);

    // // Get Period By ID
    // const [period, setPeriod] = useState<PeriodDTO | null>(null);

    // useEffect(() => {
    //     const fetchPeriodById = async (id: number) => {
    //         const data = await PeriodService.getById(id);

    //         console.log("Fetched period by Id:", data);
    //         setPeriod(data);
    //     };

    //     fetchPeriodById(3);
    // }, []);

    // const [units, setUnits] = useState<UnitDTO[]>([]);

    // useEffect(() => {
    //     const getUnits = async () => {
    //         const data = await UnitService.getAll();

    //         console.log("Fetched units:", data);

    //         setUnits(data);
    //     };

    //     getUnits();
    // }, []);

    // const [unit, setUnit] = useState<UnitDTO | null>(null);

    // useEffect(() => {
    //     const getUnit = async () => {
    //         const data = await UnitService.getById(2);

    //         console.log("Fetched unit by Id:", data);

    //         setUnit(data);
    //     };

    //     getUnit();
    // }, []);

    return (
        // ТО СЯ МОНА МІНЯТИ, DIZI
        <div>
            <h1>Hello. It's me. VEMBO</h1>

            <Link to="/lesson">Go To Lesson</Link>
        </div>
    );
}
