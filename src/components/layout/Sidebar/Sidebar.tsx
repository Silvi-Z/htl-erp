import styled from "styled-components";
const Side = styled.aside`
  width: 236px;
  height: 100vh;
  background: ${(p) => p.theme.colors.charcoal};
  color: ${(p) => p.theme.colors.cream};
  display: flex;
  flex-direction: column;
  border-right: 1px solid #000;
`;
const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 20px;
  border-bottom: 1px solid #2f2c26;
`;
const Logo = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 9px;
  background: linear-gradient(
    150deg,
    ${(p) => p.theme.colors.primary},
    ${(p) => p.theme.colors.primaryDark}
  );
  display: grid;
  place-items: center;
  font-family: ${(p) => p.theme.typography.display};
  font-weight: 700;
  font-size: 19px;
  color: #fff;
`;
const Nav = styled.nav`
  padding: 14px 12px;
  flex: 1;
  p {
  font-weight: 200;
  font-size: 11px;
  color: #c0afaf
  }
`;
const Item = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 9px 11px;
  border-radius: 8px;
  color: ${(p) => p.theme.colors.cream};
  background: ${(p) =>
    p.$active
      ? "linear-gradient(90deg,rgba(192,96,31,.22),rgba(192,96,31,.04))"
      : "transparent"};
  box-shadow: ${(p) =>
    p.$active ? "inset 2px 0 0 " + p.theme.colors.primary : "none"};
  opacity: ${(p) => (p.$active ? 1 : 0.82)};
  cursor: pointer;
  text-align: left;
  &:hover {
    background: #2b2823;
    opacity: 1;
  }
`;
const Footer = styled.div`
  padding: 12px;
  border-top: 1px solid #2f2c26;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(p) => p.theme.colors.sand};
  color: ${(p) => p.theme.colors.charcoal};
  display: grid;
  place-items: center;
  font-weight: 700;
`;
export function Sidebar({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate: (id: string) => void;
}) {
  const categories = [
    {name: "Հիմնական", subcategory:[
        ["dashboard", "⌂", "Գլխավոր վահանակ"],
        ["products", "▦", "Ապրանքներ"],
        ["pos", "🧾", "Վաճառքներ"],
        ["warehouse", "◒", "Պահեստ"],
        ["transfer", "⇄", "Ներպահեստային տեղափոխում"]
    ]},
    {name: "Կոնտրագենտներ", subcategory:[
        ["clients", "👤", "Հաճախորդներ"],
        ["users", "👤", "Մատակարարներ"],
        ["employees", "👥", "Աշխատակիցներ"]
    ]},
    {name: "Այլ", subcategory:[
        ["reports", "📋", "Հաշվետվություններ"],
        ["settings", "⚙", "Կարգավորումներ"],
    ]}
  ];
  return (
    <Side>
      <Brand>
        <Logo>Հ</Logo>
        <div>
          <b>ՀՏԼ ERP</b>
          <small
            style={{
              display: "block",
              color: "#b8ad97",
              fontSize: 10,
              letterSpacing: ".14em",
            }}
          >
            MANAGEMENT
          </small>
        </div>
      </Brand>
      <Nav>

        {categories.map((category, index) => (
          <div key={index}>
            <p>{category.name}</p>
            {category.subcategory.map(([id, icon, label]) => (
              <Item key={id} $active={active === id} onClick={() => onNavigate(id)}>
                <span style={{ width: 17 }}>{icon}</span>
                {label}
              </Item>
            ))}
          </div>
        ))}
      </Nav>
      <Footer>
        <Avatar>Հ</Avatar>
        <div>
          <b>Հայկ</b>
          <small style={{ display: "block", color: "#b8ad97" }}>
            Administrator
          </small>
        </div>
      </Footer>
    </Side>
  );
}
