import styled from "styled-components";
export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}
const Root = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 13px;
  &[aria-disabled="true"] {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;
const Track = styled.span<{ $checked: boolean }>`
  width: 42px;
  height: 24px;
  padding: 3px;
  border-radius: 999px;
  background: ${(p) =>
    p.$checked ? p.theme.colors.primary : p.theme.colors.border};
  transition: 150ms;
  display: flex;
  align-items: center;
  justify-content: ${(p) => (p.$checked ? "flex-end" : "flex-start")};
`;
const Knob = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;
export function Toggle({ checked, onChange, label, disabled }: ToggleProps) {
  return (
    <Root aria-disabled={disabled}>
      <input
        hidden
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <Track $checked={checked}>
        <Knob />
      </Track>
      {label && <span>{label}</span>}
    </Root>
  );
}
