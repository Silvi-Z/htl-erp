import styled from "styled-components";
const Wrap = styled.div`
  display: grid;
  place-items: center;
  min-height: 160px;
  color: ${(p) => p.theme.colors.muted};
  gap: 10px;
`;
const Spinner = styled.span`
  width: 28px;
  height: 28px;
  border: 3px solid ${(p) => p.theme.colors.border};
  border-top-color: ${(p) => p.theme.colors.primary};
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <Wrap role="status">
      <Spinner />
      <span>{label}</span>
    </Wrap>
  );
}
