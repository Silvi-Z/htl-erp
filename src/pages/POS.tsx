import { useState } from "react";
import { Button, SearchField, Badge, EmptyState } from "../components/ui";
import styled from "styled-components";
const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 396px;
  height: 100vh;
`;
const Picker = styled.div`
  overflow: auto;
  border-right: 1px solid ${(p) => p.theme.colors.border};
  padding: 24px;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  margin-top: 16px;
`;
const Card = styled.button`
  text-align: left;
  border: 1px solid ${(p) => p.theme.colors.border};
  background: ${(p) => p.theme.colors.card};
  border-radius: 12px;
  padding: 13px;
  cursor: pointer;
  min-height: 120px;
  &:hover {
    border-color: ${(p) => p.theme.colors.primary};
    transform: translateY(-2px);
  }
`;
const Cart = styled.aside`
  background: linear-gradient(180deg, #fbf7ef, #f4efe4);
  padding: 22px;
  display: flex;
  flex-direction: column;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid ${(p) => p.theme.colors.borderLight};
`;
const items = [
  { id: 1, name: "Ալյուր բարձրակարգ", price: 450 },
  { id: 2, name: "Շաքարավազ", price: 390 },
  { id: 3, name: "Կաթ 3.2%", price: 620 },
  { id: 4, name: "Կարագ", price: 3200 },
];
export function POS() {
  const [cart, setCart] = useState<number[]>([]);
  return (
    <Layout>
      <Picker>
        <SearchField placeholder="Scan barcode or search…" />
        <Grid>
          {items.map((p) => (
            <Card key={p.id} onClick={() => setCart((c) => [...c, p.id])}>
              <Badge variant="primary">Product</Badge>
              <div style={{ fontWeight: 600, marginTop: 12 }}>{p.name}</div>
              <div style={{ marginTop: 20, fontFamily: "JetBrains Mono" }}>
                {p.price.toLocaleString()} ֏
              </div>
            </Card>
          ))}
        </Grid>
      </Picker>
      <Cart>
        <div
          style={{
            fontFamily: "Noto Serif Armenian",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          Ընթացիկ վաճառք
        </div>
        <div style={{ flex: 1, overflow: "auto" }}>
          {!cart.length ? (
            <EmptyState
              title="Cart is empty"
              description="Select a product to add it to the order."
            />
          ) : (
            cart.map((id, i) => {
              const p = items.find((x) => x.id === id)!;
              return (
                <Row key={`${id}-${i}`}>
                  <span>{p.name}</span>
                  <b>{p.price.toLocaleString()} ֏</b>
                </Row>
              );
            })
          )}
        </div>
        <Button size="lg" disabled={!cart.length}>
          Checkout ·{" "}
          {cart
            .reduce(
              (s, id) => s + (items.find((x) => x.id === id)?.price || 0),
              0,
            )
            .toLocaleString()}{" "}
          ֏
        </Button>
      </Cart>
    </Layout>
  );
}
