import { useState } from "react";
import DailyQuestBlocksContainer from "../cards/quests/dailyQuestBlocksContainer";
import MonthlyQuestCard from "../cards/quests/monthlyQuestCard";

export default function QuestContent() {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    return (
        <div className={`quests ${isLoaded ? "fade-in" : "fade-out"}`}>
            <MonthlyQuestCard />

            <DailyQuestBlocksContainer setIsLoaded={setIsLoaded} />
        </div>
    );
}
