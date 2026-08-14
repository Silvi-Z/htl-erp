import type { ReactNode } from "react";
import styled from "styled-components";
import { LoadingState } from "../LoadingState";
import { EmptyState } from "../EmptyState";
export interface Column<T> {
  key: string;
  title: string;
  render?: (value: unknown, row: T) => ReactNode;
  width?: string;
}
export interface TableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (row: T) => void;
}
const Wrap = styled.div`
  width: 100%;
  overflow: auto;
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radius.xl};
  background: ${(p) => p.theme.colors.card};
`;
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const Th = styled.th`
  position: sticky;
  top: 0;
  text-align: left;
  background: #f0eadd;
  color: ${(p) => p.theme.colors.muted};
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 600;
  padding: 11px 16px;
  border-bottom: 1px solid ${(p) => p.theme.colors.border};
  white-space: nowrap;
`;
const Td = styled.td`
  padding: 13px 16px;
  border-bottom: 1px solid ${(p) => p.theme.colors.borderLight};
  vertical-align: middle;
`;
const Tr = styled.tr<{ $clickable: boolean }>`
  transition: 120ms;
  background: ${(p) => p.theme.colors.card};
  ${(p) => p.$clickable && `cursor:pointer;&:hover{background:#fbf6ec}`}
`;
export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  loading,
  emptyTitle = "No data",
  emptyDescription,
  onRowClick,
}: TableProps<T>) {
  if (loading)
    return (
      <Wrap>
        <LoadingState />
      </Wrap>
    );
  if (!data.length)
    return (
      <Wrap>
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </Wrap>
    );
  return (
    <Wrap>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((c) => (
              <Th key={c.key} style={{ width: c.width }}>
                {c.title}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <Tr
              key={String(row.id ?? i)}
              $clickable={!!onRowClick}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((c) => (
                <Td key={c.key}>
                  {c.render
                    ? c.render(row[c.key], row)
                    : String(row[c.key] ?? "")}
                </Td>
              ))}
            </Tr>
          ))}
        </tbody>
      </StyledTable>
    </Wrap>
  );
}
