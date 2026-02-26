"use client";

import { useState } from "react";
import {
  useAdminCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "../../hooks/useAdminCategories";
import { PageHeader } from "../common/PageHeader";
import { SearchFilter } from "../common/SearchFilter";
import { LoadingSkeleton } from "../common/LoadingSkeleton";
import { ErrorState } from "../common/ErrorState";
import { EmptyState } from "../common/EmptyState";
import { CategoryTable } from "./CategoryTable";
import { CreateCategoryDialog } from "./CreateCategoryDialog";
import { EditCategoryDialog } from "./EditCategoryDialog";
import { ConfirmDialog } from "../common/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Category } from "../../types/admin.types";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function CategoryManagement() {
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [formData, setFormData] = useState({ name: "", slug: "" });

  const queryClient = useQueryClient();
  const { data: categories, isLoading, error, refetch } = useAdminCategories();

  const { mutate: createCategory } = useCreateCategory();
  const { mutate: updateCategory } = useUpdateCategory();
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

  const categoryList = Array.isArray(categories) ? categories : [];

  const filteredCategories = categoryList.filter((category: Category) => {
    return (
      category.name.toLowerCase().includes(search.toLowerCase()) ||
      category.slug.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setFormData({ name: category.name, slug: category.slug });
    setIsEditOpen(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedCategory) return;

    deleteCategory(selectedCategory.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
        queryClient.refetchQueries({ queryKey: ["admin-categories"] });
        setIsDeleteOpen(false);
        setSelectedCategory(null);
        toast.success("Category deleted successfully");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete category");
      },
    });
  };

  const handleRefresh = () => {
    refetch();
    toast.success("Data refreshed");
  };

  const handleCloseDialogs = () => {
    setIsCreateOpen(false);
    setIsEditOpen(false);
    setIsDeleteOpen(false);
    setSelectedCategory(null);
    setFormData({ name: "", slug: "" });
  };

  const handleCreateSuccess = () => {
    handleCloseDialogs();
    queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    queryClient.refetchQueries({ queryKey: ["admin-categories"] });
  };

  const handleUpdateSuccess = () => {
    handleCloseDialogs();
    queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    queryClient.refetchQueries({ queryKey: ["admin-categories"] });
  };

  if (isLoading) {
    return <LoadingSkeleton rows={5} />;
  }

  if (error) {
    return (
      <ErrorState onRetry={handleRefresh} message="Failed to load categories" />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Category Management"
        description="Create and manage subject categories"
        action={
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        }
      />

      <SearchFilter
        value={search}
        onChange={setSearch}
        placeholder="Search categories..."
      />

      {filteredCategories.length === 0 ? (
        <EmptyState
          message={
            categoryList.length === 0
              ? "No categories found"
              : "No matching categories found"
          }
          clearSearch={search ? () => setSearch("") : undefined}
          action={
            categoryList.length === 0 ? (
              <Button onClick={() => setIsCreateOpen(true)} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create your first category
              </Button>
            ) : undefined
          }
        />
      ) : (
        <CategoryTable
          categories={filteredCategories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <CreateCategoryDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onClose={handleCloseDialogs}
        formData={formData}
        setFormData={setFormData}
        onSuccess={handleCreateSuccess}
        onCreateCategory={createCategory}
      />

      <EditCategoryDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onClose={handleCloseDialogs}
        category={selectedCategory}
        formData={formData}
        setFormData={setFormData}
        onSuccess={handleUpdateSuccess}
        onUpdateCategory={updateCategory}
        onDeleteCategory={deleteCategory}
      />

      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        description={`Are you sure you want to delete "${selectedCategory?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        isLoading={isDeleting}
      />
    </div>
  );
}
