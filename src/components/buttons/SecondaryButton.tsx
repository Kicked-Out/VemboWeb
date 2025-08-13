import type { SecondaryButtonComponent } from "../../types/componentTypes";
import Button from "./Button";

export default function SecondaryButton({ title, isHidden, onClick }: SecondaryButtonComponent) {
    return <Button title={title} className="secondary-btn" isHidden={isHidden} onClick={onClick} />;
}
