"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterHeaderProps {
  hasActiveFilters: boolean;
  onClear: () => void;
}

export function FilterHeader({ hasActiveFilters, onClear }: FilterHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <span>Filters</span>
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-8 px-2 text-muted-foreground hover:text-foreground"
          type="button"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
