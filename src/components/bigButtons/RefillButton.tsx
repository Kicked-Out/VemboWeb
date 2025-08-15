import { useSelector } from "react-redux";
import VBucksBlock from "../elementBlocks/VBucksBlock";
import { selectVBucks } from "../../slices/userStatisticsSlice";

export default function RefillButton() {
    const vBucks: number = useSelector(selectVBucks);
    const heartsPrice = 450;
    const isEnoughVBucks = vBucks >= heartsPrice;

    const refillHandler = () => {
        console.log("Not implemented yet!");

        if (!isEnoughVBucks) return;
    };

    return (
        <div className={`refill-btn ${!isEnoughVBucks ? "disabled" : null}`} onClick={refillHandler}>
            <div className="refill-block">
                <img className="icon" />
                <p>Refill</p>
            </div>

            <VBucksBlock vBucks={450} />
        </div>
    );
}
