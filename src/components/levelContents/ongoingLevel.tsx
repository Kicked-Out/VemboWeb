import { Link } from "react-router-dom";
import type { OngoingLevelComponent } from "../../types/componentTypes";

export default function OngoingLevel({ currentLessonOrder, lessonAmount }: OngoingLevelComponent) {
    return (
        <div>
            <p>
                Level {currentLessonOrder} of {lessonAmount}
            </p>
            <Link to="/lesson" className="play-btn">
                Start +10 XP
            </Link>
        </div>
    );
}
