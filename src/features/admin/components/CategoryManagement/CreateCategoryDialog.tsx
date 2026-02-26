"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreateCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  formData: { name: string; slug: string };
  setFormData: (data: { name: string; slug: string }) => void;
  onSuccess: () => void;
  onCreateCategory: (
    data: { name: string; slug: string },
    options?: {
      onSuccess?: () => void;
      onError?: (error: Error) => void;
    },
  ) => void;
}

export function CreateCategoryDialog({
  open,
  onOpenChange,
  onClose,
  formData,
  setFormData,
  onSuccess,
  onCreateCategory,
}: CreateCategoryDialogProps) {
  const queryClient = useQueryClient();

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (name: string) => {
    setFormData({
      name,
      slug: generateSlug(name),
    });
  };

  const handleCreate = () => {
    if (!formData.name || !formData.slug) {
      toast.error("Please fill all fields");
      return;
    }

    onCreateCategory(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
        queryClient.refetchQueries({ queryKey: ["admin-categories"] });
        onSuccess();
        onClose();
        setFormData({ name: "", slug: "" });
        toast.success("Category created successfully");
      },
      onError: (error: Error) => {
        toast.error(error.message || "Failed to create category");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
          <DialogDescription>
            Add a new subject category for tutors
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category Name</label>
            <Input
              placeholder="e.g., Mathematics"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Slug</label>
            <Input
              placeholder="e.g., mathematics"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
            />
            <p className="text-xs text-muted-foreground">
              URL-friendly version of the name. Auto-generated from name.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
