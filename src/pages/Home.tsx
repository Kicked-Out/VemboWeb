import { Link } from "react-router-dom";
import { PeriodService } from "../styles/periodService";
import { useEffect, useState } from "react";
import type { PeriodDTO } from "../DTOs/periodDTO";

export default function Home() {
    // PeriodService Usage Example

    // Get All Periods
    const [periods, setPeriods] = useState<PeriodDTO[]>([]);

    useEffect(() => {
        const fetchPeriods = async () => {
            const data = await PeriodService.getAll();
            console.log("Fetched periods:", data);

            setPeriods(data);
        };

        fetchPeriods();
    }, []);

    // Get Period By ID
    const [period, setPeriod] = useState<PeriodDTO | null>(null);

    useEffect(() => {
        const fetchPeriodById = async (id: number) => {
            const data = await PeriodService.getById(id);

            console.log("Fetched period by Id:", data);
            setPeriod(data);
        };

        fetchPeriodById(3);
    }, []);

    return (
        // ТО СЯ МОНА МІНЯТИ, DIZI
        <div>
            <h1>Hello. It's me. VEMBO</h1>

            <Link to="/lesson">Go To Lesson</Link>
        </div>
    );
}
