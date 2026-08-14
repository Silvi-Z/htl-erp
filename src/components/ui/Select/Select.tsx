import type { SelectHTMLAttributes } from "react";
import styled from "styled-components";
import { FormError } from "../FormError";
export interface Option {
  label: string;
  value: string;
}
export interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "onChange"
> {
  label?: string;
  options: Option[];
  onChange: (value: string) => void;
  error?: string;
}
const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;
const Label = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${(p) => p.theme.colors.inkSecondary};
`;
const El = styled.select<{ $error: boolean }>`
  height: 40px;
  padding: 0 12px;
  border: 1px solid
    ${(p) => (p.$error ? p.theme.colors.danger : p.theme.colors.border)};
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.colors.card};
  color: ${(p) => p.theme.colors.ink};
  outline: none;
  &:focus {
    border-color: ${(p) => p.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(p) => p.theme.colors.primarySoft};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
export function Select({
  label,
  options,
  onChange,
  error,
  ...props
}: SelectProps) {
  return (
    <Field>
      {label && <Label>{label}</Label>}
      <El
        {...props}
        $error={!!error}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </El>
      {error && <FormError>{error}</FormError>}
    </Field>
  );
}
