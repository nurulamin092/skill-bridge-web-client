"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UseFormRegister } from "react-hook-form";
import { FilterForm } from "../../schemas";

interface SearchFilterProps {
  register: UseFormRegister<FilterForm>;
  error?: string;
}

export function SearchFilter({ register, error }: SearchFilterProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="search" className="text-sm font-medium">
        Search
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id="search"
          placeholder="Search tutors..."
          className="pl-9"
          {...register("search")}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
