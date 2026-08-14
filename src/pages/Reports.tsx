import styled from "styled-components";
import { Badge, Button } from "../components/ui";
import { PageContainer, PageHeader } from "../components/layout";
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 6px 30px;
`;
const Card = styled.div`
  background: ${(p) => p.theme.colors.card};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: 14px;
  padding: 18px 20px;
  box-shadow: ${(p) => p.theme.shadows.md};
`;
const V = styled.div`
  font-family: ${(p) => p.theme.typography.display};
  font-size: 27px;
  font-weight: 700;
  margin: 8px 0;
`;
export function Reports() {
  return (
    <PageContainer>
      <PageHeader
        title="Հաշվետվություններ"
        actions={<Button variant="secondary">Export</Button>}
      />
      <Grid>
        {[
          ["Sales", "12.8M ֏", "+14.2%"],
          ["Gross profit", "4.2M ֏", "+8.7%"],
          ["Avg. order", "18,450 ֏", "+3.4%"],
          ["Returns", "124", "-2.1%"],
        ].map(([l, v, t]) => (
          <Card key={l}>
            <div style={{ color: "#8a8478", fontSize: 12 }}>{l}</div>
            <V>{v}</V>
            <Badge variant={t.startsWith("-") ? "warning" : "success"}>
              {t}
            </Badge>
          </Card>
        ))}
      </Grid>
    </PageContainer>
  );
}
