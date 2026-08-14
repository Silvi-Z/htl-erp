import type { ButtonHTMLAttributes, ReactNode } from "react";
import styled, { css } from "styled-components";
export type ButtonVariant = "primary" | "secondary" | "text";
export type ButtonSize = "sm" | "md" | "lg";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
}
const Root = styled.button<{ $variant: ButtonVariant; $size: ButtonSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: ${(p) => p.theme.radius.lg};
  font-weight: 600;
  cursor: pointer;
  transition: 150ms ease;
  white-space: nowrap;
  ${(p) =>
    ({
      sm: css`
        min-height: 34px;
        padding: 7px 12px;
        font-size: 12px;
      `,
      md: css`
        min-height: 40px;
        padding: 10px 16px;
        font-size: 13px;
      `,
      lg: css`
        min-height: 48px;
        padding: 12px 20px;
        font-size: 14px;
      `,
    })[p.$size]}
  ${(p) =>
    p.$variant === "primary" &&
    css`
      border: 1px solid transparent;
      background: linear-gradient(
        160deg,
        ${p.theme.colors.primary},
        ${p.theme.colors.primaryDark}
      );
      color: #fff;
      box-shadow: ${p.theme.shadows.sm};
      &:hover {
        filter: brightness(1.05);
      }
      &:active {
        transform: translateY(1px);
      }
    `}
${(p) =>
    p.$variant === "secondary" &&
    css`
      background: ${p.theme.colors.card};
      border: 1px solid ${p.theme.colors.border};
      color: ${p.theme.colors.inkSecondary};
      &:hover {
        border-color: ${p.theme.colors.primary};
        color: ${p.theme.colors.primaryDark};
      }
    `}
${(p) =>
    p.$variant === "text" &&
    css`
      background: transparent;
      color: ${p.theme.colors.primaryDark};
      padding-inline: 8px;
      &:hover {
        text-decoration: underline;
      }
    `}
&:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    filter: none;
    transform: none;
  }
`;
export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <Root
      {...props}
      disabled={disabled || loading}
      $variant={variant}
      $size={size}
    >
      {loading ? "Loading…" : icon}
      {children}
    </Root>
  );
}
