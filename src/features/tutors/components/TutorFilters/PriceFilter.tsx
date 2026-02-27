"use client";

import { Slider } from "@/components/ui/slider";

interface PriceFilterProps {
  value: [number, number];
  onChange: (value: number[]) => void;
}

export function PriceFilter({ value, onChange }: PriceFilterProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium">Price Range ($/hr)</label>
        <span className="text-sm text-muted-foreground">
          ${value[0]} - ${value[1]}
        </span>
      </div>
      <Slider
        min={0}
        max={200}
        step={5}
        value={value}
        onValueChange={onChange}
        className="py-4"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>$0</span>
        <span>$200+</span>
      </div>
    </div>
  );
}
