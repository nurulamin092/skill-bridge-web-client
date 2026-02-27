"use client";

import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onCancel: () => void;
  isPending?: boolean;
  submitText?: string;
  cancelText?: string;
}

export function FormActions({
  onCancel,
  isPending = false,
  submitText = "Save",
  cancelText = "Cancel",
}: FormActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isPending}
      >
        {cancelText}
      </Button>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : submitText}
      </Button>
    </div>
  );
}
