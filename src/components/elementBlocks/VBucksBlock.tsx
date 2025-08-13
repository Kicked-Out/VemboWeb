import type { VBucksBlockComponent } from "../../types/componentTypes";

export default function VBucksBlock({ vBucks }: VBucksBlockComponent) {
    return (
        <div className="vbucks-block">
            <img className="icon" />
            <p className="text-blue">{vBucks}</p>
        </div>
    );
}
