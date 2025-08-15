import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectHearts, selectVBucks } from "../../slices/userStatisticsSlice";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import type { DialogComponent } from "../../types/componentTypes";
import { useNavigate } from "react-router-dom";
import VBucksBlock from "../elementBlocks/VBucksBlock";
import InsightButton from "../bigButtons/InsightButton";
import RefillButton from "../bigButtons/RefillButton";

export default function HeartsRanOutDialog({ onClose, isShown }: DialogComponent) {
    const hearts = useSelector(selectHearts);
    const vBucks: number = useSelector(selectVBucks);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isShown) {
            dialogRef.current?.showModal();
        }
    }, [isShown]);

    useEffect(() => {
        if (hearts === 0) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [hearts]);

    const closeModalHandler = () => {
        onClose();

        dialogRef.current?.close();
    };

    const getInsightHandler = () => {
        navigate("/insight");
    };

    return (
        <dialog ref={dialogRef} className="dialog hearts-ran-out-dialog">
            <VBucksBlock vBucks={vBucks} />
            <h2 className="modal-title">You ran out of hearts!</h2>

            <div className="btn-block">
                <InsightButton />
                <RefillButton />
            </div>

            <div className="btn-block">
                <PrimaryButton title="TRY 2 WEEKS FREE" onClick={getInsightHandler} />
                <SecondaryButton title="NO THANKS" onClick={closeModalHandler} />
            </div>
        </dialog>
    );
}
