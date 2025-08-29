import type { ButtonComponent } from "../../types/componentTypes";
import Button from "./Button";

export default function DangerButton({ title, isHidden, onClick }: ButtonComponent) {
    return <Button title={title} className="danger-btn" isHidden={isHidden} onClick={onClick} />;
}
