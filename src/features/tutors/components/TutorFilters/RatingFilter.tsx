"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RatingFilterProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

export function RatingFilter({ value, onChange }: RatingFilterProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="rating" className="text-sm font-medium">
        Minimum Rating
      </label>
      <Select value={value || "all"} onValueChange={onChange}>
        <SelectTrigger id="rating">
          <SelectValue placeholder="Any Rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any Rating</SelectItem>
          <SelectItem value="4">4+ Stars</SelectItem>
          <SelectItem value="3">3+ Stars</SelectItem>
          <SelectItem value="2">2+ Stars</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
