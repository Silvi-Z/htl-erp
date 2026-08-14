import { useMemo, useState } from "react";
import styled from "styled-components";

import { PageContainer, PageHeader } from "../components/layout";
import productsData from "../data/products.json";
import {
  Badge,
  Button,
  Pagination,
  SearchField,
  Select,
  Table,
} from "../components/ui";

type Product = {
  id: number;
  code: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  stock: number;
};

type TransferItem = {
  productId: number;
  quantity: number;
};

const locations = ["Խանութ", "Պահեստ 1", "Պահեստ 2"];

export function Transfer() {
  const [fromLocation, setFromLocation] = useState("Պահեստ 1");

  const initialProducts: Product[] = productsData.map((product) => ({
    id: parseInt(product.iid),
    code: product.art,
    name: product.n,
    category: product.cat,
    unit: product.u,
    price: product.pr.retail,
    stock: (product.stock as Record<string, number>)[fromLocation] || 0,
  }));

  const [products] = useState<Product[]>(initialProducts);
  const [toLocation, setToLocation] = useState("Խանութ");

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const [transferItems, setTransferItems] = useState<TransferItem[]>([]);

  /*
   * -------------------------
   * Derived data
   * -------------------------
   */

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !normalizedQuery ||
        `${product.name} ${product.code}`
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesCategory =
        category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, query, category]);

  const categories = useMemo(
    () => [
      {
        value: "all",
        label: "Բոլոր կատեգորիաները",
      },
      ...Array.from(new Set(products.map((product) => product.category))).map(
        (category) => ({
          value: category,
          label: category,
        }),
      ),
    ],
    [products],
  );

  const selectedProducts = useMemo(() => {
    return transferItems
      .map((item) => {
        const product = products.find(
          (product) => product.id === item.productId,
        );

        if (!product) return null;

        return {
          product,
          quantity: item.quantity,
        };
      })
      .filter(
        (
          item,
        ): item is {
          product: Product;
          quantity: number;
        } => item !== null,
      );
  }, [products, transferItems]);

  const selectedCount = transferItems.length;

  /*
   * -------------------------
   * Helpers
   * -------------------------
   */

  const isSelected = (productId: number) =>
    transferItems.some((item) => item.productId === productId);

  const getQuantity = (productId: number) =>
    transferItems.find((item) => item.productId === productId)?.quantity ?? 1;

  /*
   * -------------------------
   * Location
   * -------------------------
   */

  const handleFromChange = (location: string) => {
    if (location === toLocation) return;

    setFromLocation(location);

    // Different source = different stock.
    // Existing selection should not remain.
    setTransferItems([]);
  };

  const handleToChange = (location: string) => {
    if (location === fromLocation) return;

    setToLocation(location);
  };

  /*
   * -------------------------
   * Product selection
   * -------------------------
   */

  const handleProductToggle = (product: Product) => {
    if (product.stock <= 0) return;

    setTransferItems((current) => {
      const exists = current.some((item) => item.productId === product.id);

      if (exists) {
        return current.filter((item) => item.productId !== product.id);
      }

      return [
        ...current,
        {
          productId: product.id,
          quantity: 1,
        },
      ];
    });
  };

  /*
   * -------------------------
   * Quantity
   * -------------------------
   */

  const handleQuantityChange = (product: Product, value: number) => {
    const quantity = Math.max(1, Math.min(value || 1, product.stock));

    setTransferItems((current) =>
      current.map((item) =>
        item.productId === product.id
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    );
  };

  const handleRemoveItem = (productId: number) => {
    setTransferItems((current) =>
      current.filter((item) => item.productId !== productId),
    );
  };

  /*
   * -------------------------
   * Transfer
   * -------------------------
   */

  const handleTransfer = () => {
    if (!transferItems.length) return;

    const payload = {
      from: fromLocation,
      to: toLocation,
      items: transferItems,
    };

    console.log("TRANSFER", payload);

    /*
      API example:

      await transferProducts({
        from: fromLocation,
        to: toLocation,
        items: transferItems,
      });
    */

    setTransferItems([]);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Ներպահեստային տեղափոխում"
        crumb="ՀՏԼ ERP · Ներպահեստային տեղափոխում"
      />

      {/* =========================
          FROM → TO
      ========================= */}

      <TransferRoute>
        <RouteSection>
          <RouteLabel>Որտեղից</RouteLabel>

          <SegmentedControl>
            {locations.map((location) => (
              <SegmentButton
                key={location}
                $active={location === fromLocation}
                $disabled={location === toLocation}
                disabled={location === toLocation}
                onClick={() => handleFromChange(location)}
              >
                {location}
              </SegmentButton>
            ))}
          </SegmentedControl>
        </RouteSection>

        <RouteArrow>→</RouteArrow>

        <RouteSection>
          <RouteLabel>Ուր</RouteLabel>

          <SegmentedControl>
            {locations.map((location) => (
              <SegmentButton
                key={location}
                $active={location === toLocation}
                $disabled={location === fromLocation}
                disabled={location === fromLocation}
                onClick={() => handleToChange(location)}
              >
                {location}
              </SegmentButton>
            ))}
          </SegmentedControl>
        </RouteSection>
      </TransferRoute>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <Content>
        {/* =========================
            PRODUCTS
        ========================= */}

        <MainArea>
          <SectionHeader>
            <SectionTitle>Ապրանքներ</SectionTitle>

            <SectionHint>
              Ընտրեք այն ապրանքները, որոնք ցանկանում եք տեղափոխել։
            </SectionHint>
          </SectionHeader>

          <Filters>
            <SearchField
              placeholder="Որոնել ապրանքներ…"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
            />

            <Select
              value={category}
              onChange={(value) => {
                setCategory(value);
                setPage(1);
              }}
              options={categories}
            />
          </Filters>

          <Table<Product>
            columns={[
              {
                key: "code",
                title: "Կոդ",
                width: "110px",
              },

              {
                key: "name",
                title: "Ապրանք",
                render: (value, row) => (
                  <ProductCell>
                    <ProductName>{String(value)}</ProductName>

                    <ProductCategory>{row.category}</ProductCategory>
                  </ProductCell>
                ),
              },

              {
                key: "unit",
                title: "Միավոր",
              },

              {
                key: "price",
                title: "Գին",
                render: (value) => (
                  <Price>{Number(value).toLocaleString()} ֏</Price>
                ),
              },

              {
                key: "stock",
                title: "Մնացորդ",
                render: (value, row) => {
                  const stock = Number(value);

                  return (
                    <StockCell>
                      <Badge
                        variant={
                          stock === 0
                            ? "danger"
                            : stock < 10
                              ? "warning"
                              : "success"
                        }
                      >
                        {stock === 0 ? "Առկա չէ" : `${stock} ${row.unit}`}
                      </Badge>
                    </StockCell>
                  );
                },
              },

              {
                key: "actions",
                title: "",
                width: "110px",

                render: (_, row) => {
                  const selected = isSelected(row.id);
                  const disabled = row.stock <= 0;

                  return (
                    <Button
                      size="sm"
                      variant={selected ? "secondary" : "text"}
                      disabled={disabled}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleProductToggle(row);
                      }}
                    >
                      {selected ? "Հեռացնել" : "Ավելացնել"}
                    </Button>
                  );
                },
              },
            ]}
            data={filteredProducts}
          />

          <Pagination
            page={page}
            totalPages={Math.max(1, Math.ceil(filteredProducts.length / 10))}
            onChange={setPage}
          />
        </MainArea>

        {/* =========================
            TRANSFER CART
        ========================= */}

        <SelectedPanel>
          <SelectedHeader>
            <div>
              <SelectedTitle>Կտեղափոխվի</SelectedTitle>

              <SelectedCount>
                {selectedCount === 0
                  ? "Ապրանքներ ընտրված չեն"
                  : `${selectedCount} ապրանք ընտրված է`}
              </SelectedCount>
            </div>
          </SelectedHeader>

          {selectedProducts.length === 0 ? (
            <EmptyState>
              <EmptyIcon>+</EmptyIcon>

              <EmptyTitle>Ավելացրեք ապրանքներ</EmptyTitle>

              <EmptyText>
                Ապրանքի կողքի «Ընտրել» կոճակով այն ավելացրեք տեղափոխման
                ցուցակին։
              </EmptyText>
            </EmptyState>
          ) : (
            <>
              <SelectedList>
                {selectedProducts.map(({ product, quantity }) => (
                  <SelectedProduct key={product.id}>
                    <SelectedProductInfo>
                      <SelectedProductName>{product.name}</SelectedProductName>

                      <SelectedProductMeta>
                        {product.code} · Առկա է {product.stock} {product.unit}
                      </SelectedProductMeta>

                      <QuantityControl>
                        <QuantityButton
                          type="button"
                          disabled={quantity <= 1}
                          onClick={() =>
                            handleQuantityChange(product, quantity - 1)
                          }
                        >
                          −
                        </QuantityButton>

                        <QuantityInput
                          type="number"
                          min={1}
                          max={product.stock}
                          value={quantity}
                          onChange={(event) =>
                            handleQuantityChange(
                              product,
                              Number(event.target.value),
                            )
                          }
                        />

                        <QuantityButton
                          type="button"
                          disabled={quantity >= product.stock}
                          onClick={() =>
                            handleQuantityChange(product, quantity + 1)
                          }
                        >
                          +
                        </QuantityButton>

                        <QuantityUnit>{product.unit}</QuantityUnit>
                      </QuantityControl>
                    </SelectedProductInfo>

                    <RemoveButton
                      type="button"
                      onClick={() => handleRemoveItem(product.id)}
                      aria-label={`Հեռացնել ${product.name}`}
                    >
                      ×
                    </RemoveButton>
                  </SelectedProduct>
                ))}
              </SelectedList>

              <TransferFooter>
                <TransferSummary>
                  <span>Տեղափոխում</span>

                  <strong>
                    {fromLocation} → {toLocation}
                  </strong>
                </TransferSummary>

                <Button size="lg" variant="primary" onClick={handleTransfer}>
                  Տեղափոխել
                </Button>
              </TransferFooter>
            </>
          )}
        </SelectedPanel>
      </Content>
    </PageContainer>
  );
}

/* =====================================================
   ROUTE
===================================================== */

const TransferRoute = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;

  margin: 0 30px 20px;
  padding: 18px 26px;

  background: #fffdf8;
  border: 1px solid #e3ddd1;
  border-radius: 16px;

  box-shadow:
    0 1px 2px rgba(30, 25, 15, 0.05),
    0 8px 24px -12px rgba(30, 25, 15, 0.18);
`;

const RouteSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const RouteLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #8a8478;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const SegmentedControl = styled.div`
  display: flex;
  gap: 2px;

  padding: 3px;

  background: #e9e1d1;
  border-radius: 9px;
`;

const SegmentButton = styled.button<{
  $active: boolean;
  $disabled: boolean;
}>`
  border: 0;
  border-radius: 7px;

  padding: 7px 13px;

  background: ${({ $active }) => ($active ? "#ffffff" : "transparent")};

  color: ${({ $active }) => ($active ? "#2f2b24" : "#6f695e")};

  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};

  opacity: ${({ $disabled }) => ($disabled ? 0.35 : 1)};

  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};

  box-shadow: ${({ $active }) =>
    $active ? "0 1px 3px rgba(30, 25, 15, 0.12)" : "none"};

  transition:
    background 0.15s ease,
    opacity 0.15s ease;

  &:hover:not(:disabled) {
    background: #ffffff;
  }
`;

const RouteArrow = styled.div`
  font-size: 22px;
  color: #9a9285;
`;

/* =====================================================
   CONTENT
===================================================== */

const Content = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  gap: 24px;

  padding: 0 30px;

  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: minmax(0, 1fr) 380px;
  }

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const MainArea = styled.div`
  min-width: 0;
`;

const SectionHeader = styled.div`
  margin-bottom: 14px;
`;

const SectionTitle = styled.h3`
  margin: 0;

  font-size: 16px;
  font-weight: 700;
  color: #2f2b24;
`;

const SectionHint = styled.p`
  margin: 4px 0 0;

  font-size: 12px;
  color: #8a8478;
`;

const Filters = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: 12px;

  margin-bottom: 16px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

/* =====================================================
   PRODUCT TABLE
===================================================== */

const ProductCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const ProductName = styled.b`
  font-weight: 600;
  color: #2f2b24;
`;

const ProductCategory = styled.small`
  color: #8a8478;
`;

const Price = styled.span`
  font-family: "JetBrains Mono", monospace;
  font-size: 13px;
`;

const StockCell = styled.div`
  display: flex;
  align-items: center;
`;

/* =====================================================
   SELECTED PRODUCTS
===================================================== */

const SelectedPanel = styled.aside`
  position: sticky;
  top: 20px;

  display: flex;
  flex-direction: column;

  min-height: 520px;
  max-height: calc(100vh - 40px);

  background: #fffdf8;
  border: 1px solid #e3ddd1;
  border-radius: 16px;

  box-shadow:
    0 1px 2px rgba(30, 25, 15, 0.05),
    0 8px 24px -12px rgba(30, 25, 15, 0.18);

  overflow: hidden;
`;

const SelectedHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px 20px 16px;

  border-bottom: 1px solid #ebe5da;
`;
const SelectedTitle = styled.h3`
  margin: 0;

  font-size: 17px;
  font-weight: 700;
  color: #2f2b24;
`;

const SelectedCount = styled.span`
  display: block;

  margin-top: 5px;

  font-size: 12px;
  color: #8a8478;
`;

const EmptyState = styled.div`
  display: flex;
  flex: 1;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 40px 24px;

  text-align: center;
`;

const EmptyIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;

  margin-bottom: 12px;

  background: #eee8dc;
  border-radius: 12px;

  color: #756e62;
  font-size: 20px;
`;

const EmptyTitle = styled.div`
  margin-bottom: 5px;

  font-size: 14px;
  font-weight: 600;
  color: #403a31;
`;

const EmptyText = styled.p`
  max-width: 230px;

  margin: 0;

  font-size: 12px;
  line-height: 1.5;

  color: #938c80;
`;

const SelectedList = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;

  overflow-y: auto;
`;

const SelectedProduct = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;

  padding: 18px 20px;

  border-bottom: 1px solid #eee8dd;

  &:hover {
    background: #faf7f1;
  }
`;

const SelectedProductInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const SelectedProductName = styled.div`
  margin-bottom: 5px;

  overflow: hidden;

  font-size: 14px;
  font-weight: 600;
  line-height: 1.35;

  color: #383229;

  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SelectedProductMeta = styled.div`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;

  color: #999184;
`;

/* =====================================================
   QUANTITY
===================================================== */

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  margin-top: 12px;
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;

  border: 1px solid #ddd5c8;
  border-radius: 7px;

  background: #fff;

  color: #4a443b;
  font-size: 17px;

  cursor: pointer;

  &:hover:not(:disabled) {
    background: #f4efe7;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  width: 64px;
  height: 32px;

  border: 1px solid #d8d0c3;
  border-radius: 7px;

  background: #fff;

  text-align: center;

  font-family: "JetBrains Mono", monospace;
  font-size: 13px;
  font-weight: 600;

  color: #383229;

  &:focus {
    outline: none;
    border-color: #aaa092;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    margin: 0;
    appearance: none;
  }

  &[type="number"] {
    appearance: textfield;
  }
`;

const QuantityUnit = styled.span`
  margin-left: 3px;

  font-size: 12px;
  color: #8a8478;
`;

const RemoveButton = styled.button`
  flex-shrink: 0;

  width: 28px;
  height: 28px;

  border: 0;
  border-radius: 7px;

  background: transparent;

  color: #9a9285;
  font-size: 20px;
  line-height: 1;

  cursor: pointer;

  &:hover {
    background: #f0e9df;
    color: #6f675b;
  }
`;

/* =====================================================
   TRANSFER FOOTER
===================================================== */

const TransferFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  padding: 18px 20px;

  border-top: 1px solid #e8e1d6;
  background: #faf7f1;
`;

const TransferSummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 12px;
  color: #8a8478;

  strong {
    font-size: 13px;
    color: #403a31;
    font-weight: 600;
  }
`;
