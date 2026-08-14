import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  ConfirmDialog,
  Pagination,
  SearchField,
  Select,
  Table,
} from "../components/ui";
import { PageContainer, PageHeader } from "../components/layout";
type Product = {
  id: number;
  code: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  stock: number;
};
const initial: Product[] = [
  {
    id: 1,
    code: "HTL-001",
    name: "Ալյուր բարձրակարգ",
    category: "Հացաբուլկեղեն",
    unit: "կգ",
    price: 450,
    stock: 124,
  },
  {
    id: 2,
    code: "HTL-002",
    name: "Շաքարավազ",
    category: "Հումք",
    unit: "կգ",
    price: 390,
    stock: 18,
  },
  {
    id: 3,
    code: "HTL-003",
    name: "Կաթ 3.2%",
    category: "Կաթնամթերք",
    unit: "լ",
    price: 620,
    stock: 0,
  },
  {
    id: 4,
    code: "HTL-004",
    name: "Կարագ",
    category: "Կաթնամթերք",
    unit: "կգ",
    price: 3200,
    stock: 7,
  },
];
export function Products() {
  const [products, setProducts] = useState(initial);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (!query ||
            `${p.name} ${p.code}`.toLowerCase().includes(query.toLowerCase())) &&
          (category === "all" || p.category === category),
      ),
    [products, query, category],
  );
  return (
    <PageContainer>
      <PageHeader
        title="Ապրանքներ"
        crumb="ՀՏԼ ERP · Ապրանքներ"
        actions={<Button>＋ Նոր ապրանք</Button>}
      />
      <div style={{ padding: "0 30px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 200px",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <SearchField
            placeholder="Որոնել ապրանքներ…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
          <Select
            value={category}
            onChange={(v) => {
              setCategory(v);
              setPage(1);
            }}
            options={[
              { value: "all", label: "Բոլոր կատեգորիաներ" },
              ...Array.from(new Set(initial.map((p) => p.category))).map(
                (x) => ({ value: x, label: x }),
              ),
            ]}
          />
        </div>
        <Table<Product>
          columns={[
            { key: "code", title: "Կոդ", width: "110px" },
            {
              key: "name",
              title: "Ապրանք",
              render: (v, row) => (
                <div>
                  <b>{String(v)}</b>
                  <small style={{ display: "block", color: "#8a8478" }}>
                    {row.category}
                  </small>
                </div>
              ),
            },
            { key: "unit", title: "Միավոր" },
            {
              key: "price",
              title: "Գին",
              render: (v) => (
                <span style={{ fontFamily: "JetBrains Mono" }}>
                  {Number(v).toLocaleString()} ֏
                </span>
              ),
            },
            {
              key: "stock",
              title: "Կարգավիճակ",
              render: (v) => {
                const n = Number(v);
                return (
                  <Badge
                    variant={
                      n === 0 ? "danger" : n < 10 ? "warning" : "success"
                    }
                  >
                    {n === 0
                      ? "Out of stock"
                      : n < 10
                        ? `Low · ${n}`
                        : `In stock · ${n}`}
                  </Badge>
                );
              },
            },
            {
              key: "actions",
              title: "",
              render: (_, row) => (
                <Button
                  size="sm"
                  variant="text"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteId(row.id);
                  }}
                >
                  Delete
                </Button>
              ),
            },
          ]}
          data={filtered}
        />
        <Pagination
          page={page}
          totalPages={Math.max(1, Math.ceil(filtered.length / 10))}
          onChange={setPage}
        />
      </div>
      <ConfirmDialog
        open={deleteId !== null}
        title="Delete product?"
        message="This action cannot be undone."
        danger
        confirmLabel="Delete"
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          setProducts((p) => p.filter((x) => x.id !== deleteId));
          setDeleteId(null);
        }}
      />
    </PageContainer>
  );
}
