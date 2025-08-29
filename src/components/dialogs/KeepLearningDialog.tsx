import { useEffect, useRef } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import DangerButton from "../buttons/DangerButton";
import { useNavigate } from "react-router-dom";
import type { DialogComponent } from "../../types/componentTypes";

export default function KeepLearningDialog({ onClose, isShown, onClick = () => {} }: DialogComponent) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isShown) {
            dialogRef.current?.showModal();
        }
    }, [isShown]);

    const closeModalHandler = () => {
        dialogRef.current?.close();

        onClose();
        navigate("/");
    };

    const onClickModalHandler = () => {
        dialogRef.current?.close();

        onClick();
    };

    return (
        <dialog ref={dialogRef} className="dialog keep-learning-dialog">
            <img className="vembo-mid-icon" />
            <h2 className="modal-title">Wait, don't go! You'll lose your progress if you quit now</h2>

            <div className="btn-block">
                <PrimaryButton title="KEEP LEARNING" onClick={onClickModalHandler} />
                <DangerButton title="END SESSION" onClick={closeModalHandler} />
            </div>
        </dialog>
    );
}
