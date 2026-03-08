"use client";

import { CategoryTypes } from "@/features/categories/types/category.types";

interface CategoryCheckboxProps {
  category: CategoryTypes;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CategoryCheckbox({
  category,
  checked,
  onChange,
}: CategoryCheckboxProps) {
  return (
    <label
      className={`
        flex items-center space-x-2 p-3 border rounded-lg cursor-pointer
        transition-colors hover:bg-muted/50
        ${checked ? "border-primary bg-primary/5" : ""}
      `}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-sm font-medium">{category.name}</span>
    </label>
  );
}
