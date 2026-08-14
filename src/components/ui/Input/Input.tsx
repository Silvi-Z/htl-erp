import type { InputHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import { FormError } from "../FormError";
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
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
const Wrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const InputEl = styled.input<{ $error: boolean }>`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid
    ${(p) => (p.$error ? p.theme.colors.danger : p.theme.colors.border)};
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.colors.card};
  color: ${(p) => p.theme.colors.ink};
  outline: none;
  &:focus {
    border-color: ${(p) =>
      p.$error ? p.theme.colors.danger : p.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(p) => p.theme.colors.primarySoft};
  }
  &:disabled {
    background: ${(p) => p.theme.colors.paper};
    cursor: not-allowed;
    opacity: 0.6;
  }
  ::placeholder {
    color: ${(p) => p.theme.colors.muted};
  }
`;
const Adornment = styled.span`
  position: absolute;
  display: grid;
  place-items: center;
  color: ${(p) => p.theme.colors.muted};
  pointer-events: none;
`;
export function Input({
  label,
  error,
  hint,
  startAdornment,
  endAdornment,
  ...props
}: InputProps) {
  return (
    <Field>
      {label && <Label>{label}</Label>}
      <Wrap>
        {startAdornment && (
          <Adornment style={{ left: 12 }}>{startAdornment}</Adornment>
        )}
        <InputEl
          {...props}
          $error={!!error}
          style={{
            paddingLeft: startAdornment ? 36 : 12,
            paddingRight: endAdornment ? 36 : 12,
          }}
        />
        {endAdornment && (
          <Adornment style={{ right: 12 }}>{endAdornment}</Adornment>
        )}
      </Wrap>
      {error ? (
        <FormError>{error}</FormError>
      ) : (
        hint && <small style={{ color: "var(--muted)" }}>{hint}</small>
      )}
    </Field>
  );
}
