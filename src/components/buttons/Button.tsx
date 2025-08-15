import type { ButtonComponent } from "../../types/componentTypes";

export default function Button({ title, className, isHidden, onClick, disabled }: ButtonComponent) {
    return (
        <button className={`${className} ${isHidden ? "hidden" : null}`} onClick={onClick} disabled={disabled}>
            {title}
        </button>
    );
}
