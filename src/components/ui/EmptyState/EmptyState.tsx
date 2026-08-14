import type { ReactNode } from "react";
import styled from "styled-components";
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  padding: 32px;
  text-align: center;
  color: ${(p) => p.theme.colors.muted};
`;
const Title = styled.h3`
  margin: 0 0 6px;
  color: ${(p) => p.theme.colors.ink};
  font-family: ${(p) => p.theme.typography.display};
  font-size: 17px;
`;
const Desc = styled.p`
  margin: 0 0 16px;
  max-width: 420px;
  font-size: 13px;
`;
export function EmptyState({
  title = "Nothing here yet",
  description,
  action,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <Wrap>
      <Title>{title}</Title>
      {description && <Desc>{description}</Desc>}
      {action}
    </Wrap>
  );
}
