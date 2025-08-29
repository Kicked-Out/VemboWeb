import type { PrimaryButtonComponent } from "../../types/componentTypes";
import Button from "./Button";

export default function PrimaryButton({ title, isHidden, onClick }: PrimaryButtonComponent) {
    return <Button title={title} className="primary-btn" isHidden={isHidden} onClick={onClick} />;
}
