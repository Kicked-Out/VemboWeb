import { useDispatch, useSelector } from "react-redux";
import { selectChestStatus, setChestStatus, setSecondLevelStatus } from "../../slices/menuSlice";
import type { ChestButtonComponent } from "../../types/componentTypes";
import { giveVBucks } from "../../slices/userStatisticsSlice";

export default function ChestButton({ id, x, levelTypeId, levelCompletedCount }: ChestButtonComponent) {
    const levelTypes: Record<number, string> = {
        1: "default",
        2: "practice",
        3: "review",
        4: "chest",
    };
    const chestStatus = useSelector(selectChestStatus);
    const dispatch = useDispatch();

    const getLevelImage = () => {
        return levelTypes[levelTypeId] || "default";
    };

    const openChest = () => {
        if (chestStatus !== 0 && chestStatus !== undefined && chestStatus !== 2) {
            dispatch(setChestStatus({ chestStatus: 2 }));
            dispatch(giveVBucks({ vBucks: 5 }));
            dispatch(setSecondLevelStatus({ secondLevelStatus: 1 }));
        }
    };

    const btnPressHandler = () => {
        openChest();
    };

    return (
        <div
            className={`chest-btn ${chestStatus === 1 && id == 2 ? "chest-active" : ""}`}
            onClick={btnPressHandler}
            style={{ left: `${x}px` }}
        >
            <img
                className="chest-icon"
                src={`../src/assets/icons/levels/${getLevelImage()}_${
                    chestStatus === 2 && id == 2
                        ? "opened"
                        : chestStatus === 1 && id == 2
                        ? "active"
                        : levelCompletedCount! >= 1
                        ? "active"
                        : "inactive"
                }.png`}
            />
        </div>
    );
}
