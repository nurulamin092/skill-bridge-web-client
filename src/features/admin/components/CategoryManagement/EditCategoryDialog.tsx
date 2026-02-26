"use client";

import { useEffect, useState } from "react";
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
import { Category } from "../../types/admin.types";

interface EditCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  category: Category | null;
  formData: { name: string; slug: string };
  setFormData: (data: { name: string; slug: string }) => void;
  onSuccess: () => void;
  onUpdateCategory: (
    data: { id: string; name: string; slug: string },
    options?: {
      onSuccess?: (data: Category) => void;
      onError?: (error: Error) => void;
    },
  ) => void;
  onDeleteCategory: (
    id: string,
    options?: {
      onSuccess?: () => void;
      onError?: (error: Error) => void;
    },
  ) => void;
}

export function EditCategoryDialog({
  open,
  onOpenChange,
  onClose,
  category,
  formData,
  setFormData,
  onSuccess,
  onUpdateCategory,
  onDeleteCategory,
}: EditCategoryDialogProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (category) {
      setFormData({ name: category.name, slug: category.slug });
    }
  }, [category, setFormData]);

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

  const handleUpdate = () => {
    if (!category) return;
    if (!formData.name || !formData.slug) {
      toast.error("Please fill all fields");
      return;
    }

    setIsUpdating(true);
    onUpdateCategory(
      { id: category.id, ...formData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
          queryClient.refetchQueries({ queryKey: ["admin-categories"] });
          onSuccess();
          onClose();
          setFormData({ name: "", slug: "" });
          toast.success("Category updated successfully");
          setIsUpdating(false);
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update category");
          setIsUpdating(false);
        },
      },
    );
  };

  const handleDelete = () => {
    if (!category) return;

    setIsDeleting(true);
    onDeleteCategory(category.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
        queryClient.refetchQueries({ queryKey: ["admin-categories"] });
        onSuccess();
        onClose();
        setFormData({ name: "", slug: "" });
        toast.success("Category deleted successfully");
        setIsDeleting(false);
      },
      onError: (error: Error) => {
        toast.error(error.message || "Failed to delete category");
        setIsDeleting(false);
      },
    });
  };

  if (!category) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>Update category information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category Name</label>
            <Input
              placeholder="e.g., Mathematics"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
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
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting || isUpdating}
            className="mr-auto"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isUpdating || isDeleting}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isUpdating || isDeleting}>
              {isUpdating ? "Updating..." : "Update Category"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
