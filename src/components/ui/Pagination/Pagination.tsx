import styled from "styled-components";
import { Button } from "../Button";
const Wrap = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 16px;
`;
const Info = styled.span`
  margin: 0 8px;
  font-size: 12px;
  color: ${(p) => p.theme.colors.muted};
`;
export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <Wrap>
      <Button
        size="sm"
        variant="secondary"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        ‹
      </Button>
      <Info>
        {page} / {totalPages}
      </Info>
      <Button
        size="sm"
        variant="secondary"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        ›
      </Button>
    </Wrap>
  );
}
