import type { ReactNode } from "react";
import styled from "styled-components";
import { useEffect } from "react";
export interface ModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  width?: number;
}
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(26, 22, 12, 0.38);
  display: grid;
  place-items: center;
  padding: 24px;
`;
const Dialog = styled.div<{ $width: number }>`
  width: min(${(p) => p.$width}px, 100%);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  background: ${(p) => p.theme.colors.card};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radius.xxl};
  box-shadow: 0 24px 80px -30px rgba(0, 0, 0, 0.45);
  overflow: hidden;
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid ${(p) => p.theme.colors.borderLight};
`;
const Title = styled.h2`
  margin: 0;
  font-family: ${(p) => p.theme.typography.display};
  font-size: 18px;
`;
const Close = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${(p) => p.theme.colors.paper};
  color: ${(p) => p.theme.colors.inkSecondary};
  cursor: pointer;
  font-size: 18px;
`;
const Body = styled.div`
  padding: 20px;
  overflow: auto;
`;
const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 14px 20px;
  border-top: 1px solid ${(p) => p.theme.colors.borderLight};
`;
export function Modal({
  open,
  title,
  onClose,
  children,
  footer,
  width = 480,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <Backdrop onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <Dialog $width={width} role="dialog" aria-modal="true" aria-label={title}>
        <Header>
          {title && <Title>{title}</Title>}
          <Close onClick={onClose} aria-label="Close">
            ×
          </Close>
        </Header>
        <Body>{children}</Body>
        {footer && <Footer>{footer}</Footer>}
      </Dialog>
    </Backdrop>
  );
}
