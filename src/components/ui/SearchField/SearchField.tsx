import type { InputHTMLAttributes } from "react";
import { Input } from "../Input";
export interface SearchFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  onSearch?: (value: string) => void;
}
export function SearchField({
  onSearch,
  onKeyDown,
  ...props
}: SearchFieldProps) {
  return (
    <Input
      {...props}
      type="search"
      aria-label={props["aria-label"] || "Search"}
      startAdornment={<span>⌕</span>}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === "Enter") onSearch?.(e.currentTarget.value);
      }}
    />
  );
}
