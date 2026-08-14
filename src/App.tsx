import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import { Sidebar } from "./components/layout";
import { Dashboard } from "./pages/Dashboard";
import { Transfer } from "./pages/Transfer";
import { Products } from "./pages/Products";
import { POS } from "./pages/POS";
import { Reports } from "./pages/Reports";
export default function App() {
  const [page, setPage] = useState("dashboard");
  const content = {
    dashboard: <Dashboard />,
    products: <Products />,
    pos: <POS />,
    transfer: <Transfer />,
    reports: <Reports />,
  }[page];
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "236px 1fr",
          minHeight: "100vh",
        }}
      >
        <Sidebar active={page} onNavigate={setPage} />
        {content}
      </div>
    </ThemeProvider>
  );
}
