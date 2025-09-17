import React from "react";
import { cn } from "../../lib/utils";
import "../../styles/settings/components/input.css";

interface VemboInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    defaultValue?: string | undefined;
    error?: string;
    icon?: React.ReactNode;
}

const VemboInput = React.forwardRef<HTMLInputElement, VemboInputProps>(
    ({ className, label, defaultValue, error, icon, type = "text", ...props }, ref) => {
        return (
            <div className={cn("vinput", className)}>
                {label && <label className="vinput__label">{label}</label>}

                <div className="vinput__control">
                    <input type={type} className="vinput__field" ref={ref} defaultValue={defaultValue} {...props} />
                    {icon && <div className="vinput__icon">{icon}</div>}
                </div>

                {error && <span className="vinput__error">{error}</span>}
            </div>
        );
    }
);

VemboInput.displayName = "VemboInput";

export default VemboInput;
