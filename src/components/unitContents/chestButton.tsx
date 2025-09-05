import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectChestStatus, setChestStatus, setSecondLevelStatus } from "../../slices/menuSlice";
import type { ChestButtonComponent } from "../../types/componentTypes";
import { giveVBucks } from "../../slices/userStatisticsSlice";

export default function ChestButton({ id, x, levelTypeId, levelCompletedCount }: ChestButtonComponent) {
    const [btnActive, setBtnActive] = useState<boolean>(false);
    const [btnActiveId, setBtnActiveId] = useState<number>(0);
    const [btnSize, setBtnSize] = useState<{ width: number }>({ width: 0 });
    const btnRef = useRef<HTMLDivElement>(null);
    const levelTypes: Record<number, string> = {
        1: "default",
        2: "practice",
        3: "review",
        4: "chest",
    };
    const chestStatus = useSelector(selectChestStatus);

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

    const btnPressHandler = (id: number) => {
        setBtnActiveId(id);
        setBtnActive(!btnActive);

        openChest();

        console.log(chestStatus);
    };

    useEffect(() => {
        if (!btnRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            const rect = entries[0].contentRect;
            setBtnSize({ width: rect.width });
        });

        resizeObserver.observe(btnRef.current);

        return () => resizeObserver.disconnect();
    }, []);

    const dispatch = useDispatch();

    return (
        <div
            ref={btnRef}
            className={`chest-btn ${chestStatus === 1 && id == 2 ? "chest-active" : ""}`}
            onClick={() => {
                btnPressHandler(id);
            }}
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
