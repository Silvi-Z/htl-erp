import styled from "styled-components";
export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
}
const Root = styled.label`
  display: inline-flex;
  align-items: flex-start;
  gap: 9px;
  cursor: pointer;
  font-size: 13px;
  color: ${(p) => p.theme.colors.inkSecondary};
  user-select: none;
  &[aria-disabled="true"] {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;
const Box = styled.span<{ $checked: boolean }>`
  width: 18px;
  height: 18px;
  flex: none;
  border-radius: 5px;
  border: 1px solid
    ${(p) => (p.$checked ? p.theme.colors.primary : p.theme.colors.border)};
  background: ${(p) =>
    p.$checked ? p.theme.colors.primary : p.theme.colors.card};
  display: grid;
  place-items: center;
  color: #fff;
  font-size: 12px;
  transition: 150ms;
  &:after {
    content: "${(p) => (p.$checked ? "✓" : "")}";
  }
`;
export function Checkbox({
  checked,
  onChange,
  label,
  disabled,
  error,
}: CheckboxProps) {
  return (
    <Root aria-disabled={disabled}>
      <input
        type="checkbox"
        hidden
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <Box $checked={checked} />
      <span>{label}</span>
      {error && <small style={{ color: "#a33" }}>{error}</small>}
    </Root>
  );
}
