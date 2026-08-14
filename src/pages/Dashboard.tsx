import { Button, Badge } from "../components/ui";
import { PageContainer, PageHeader } from "../components/layout";
import styled from "styled-components";
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 6px 30px;
`;
const Card = styled.section`
  background: ${(p) => p.theme.colors.card};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: 14px;
  padding: 18px 20px;
  box-shadow: ${(p) => p.theme.shadows.md};
`;
const Value = styled.div`
  font-family: ${(p) => p.theme.typography.display};
  font-size: 27px;
  font-weight: 700;
  margin-top: 8px;
`;
const Muted = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme.colors.muted};
`;
export function Dashboard() {
  return (
    <PageContainer>
      <PageHeader
        title="Բարի գալուստ"
        actions={<Button>＋ Նոր վաճառք</Button>}
      />
      <Grid>
        <Card>
          <Muted>Այսօրվա վաճառք</Muted>
          <Value>275 896 ֏</Value>
          <Badge variant="success">↑ 10 հաշիվ այսօր</Badge>
        </Card>
        <Card>
          <Muted>Այս ամսվա շրջանառություն</Muted>
          <Value>9.7 մլն ֏</Value>
          <Badge variant="primary">↓ 24.4% նախ. ամսվա հետ</Badge>
        </Card>
        <Card>
          <Muted>Հաշիվներ (ամիս)</Muted>
          <Value>196</Value>
          <Badge variant="success">միջին չեկ՝ 58 397 ֏</Badge>
        </Card>
        <Card>
          <Muted>Ցածր մնացորդ</Muted>
          <Value>1</Value>
          <Badge variant="warning">պահանջում է համալրում</Badge>
        </Card>
      </Grid>
    </PageContainer>
  );
}
