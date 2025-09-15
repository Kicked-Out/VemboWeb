import '../../styles/settings/components/toggle-switch.css';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const ToggleSwitch = ({ checked, onChange, disabled = false }: ToggleSwitchProps) => {
  return (
    <div
      className={`toggle ${checked ? 'is-checked' : ''} ${disabled ? 'is-disabled' : ''}`}
      onClick={() => !disabled && onChange(!checked)}
    >
      <div className="toggle__track" />
      <div className="toggle__thumb" />
    </div>
  );
};

export default ToggleSwitch;
