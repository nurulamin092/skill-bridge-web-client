// "use client";

// import { useState } from "react";
// import {
//   useAdminCategories,
//   useCreateCategory,
//   useUpdateCategory,
//   useDeleteCategory,
// } from "../hooks/useAdminCategories";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Plus, Edit, Trash2, Search } from "lucide-react";
// import { toast } from "sonner";
// import { format } from "date-fns";
// import { useQueryClient } from "@tanstack/react-query";
// import { Category } from "../types/admin.types";

// export function CategoryManagement() {
//   const [search, setSearch] = useState("");
//   const [isCreateOpen, setIsCreateOpen] = useState(false);
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<Category | null>(
//     null,
//   );
//   const [formData, setFormData] = useState({ name: "", slug: "" });
//   const queryClient = useQueryClient();
//   const { data: categories, isLoading, error } = useAdminCategories();
//   const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
//   const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
//   const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

//   const filteredCategories = categories?.filter((category: Category) => {
//     return (
//       category.name.toLowerCase().includes(search.toLowerCase()) ||
//       category.slug.toLowerCase().includes(search.toLowerCase())
//     );
//   });

//   const generateSlug = (name: string) => {
//     return name
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/(^-|-$)/g, "");
//   };

//   const handleNameChange = (name: string) => {
//     setFormData({
//       name,
//       slug: generateSlug(name),
//     });
//   };

//   const handleCreate = () => {
//     if (!formData.name || !formData.slug) {
//       toast.error("Please fill all fields");
//       return;
//     }
//     createCategory(formData, {
//       onSuccess: () => {
//         setIsCreateOpen(false);
//         setFormData({ name: "", slug: "" });
//         queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
//         queryClient.refetchQueries({ queryKey: ["admin-categories"] });
//       },
//     });
//   };

//   const handleUpdate = () => {
//     if (!selectedCategory) return;
//     if (!formData.name || !formData.slug) {
//       toast.error("Please fill all fields");
//       return;
//     }
//     updateCategory(
//       { id: selectedCategory.id, ...formData },
//       {
//         onSuccess: () => {
//           setIsEditOpen(false);
//           setSelectedCategory(null);
//           setFormData({ name: "", slug: "" });
//           queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
//           queryClient.refetchQueries({ queryKey: ["admin-categories"] });
//         },
//       },
//     );
//   };

//   const handleDelete = () => {
//     if (!selectedCategory) return;
//     deleteCategory(selectedCategory.id, {
//       onSuccess: () => {
//         setIsDeleteOpen(false);
//         setSelectedCategory(null);
//         queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
//         queryClient.refetchQueries({ queryKey: ["admin-categories"] });
//         toast.success("Category deleted successfully");
//       },
//     });
//   };

//   const openEdit = (category: Category) => {
//     setSelectedCategory(category);
//     setFormData({ name: category.name, slug: category.slug });
//     setIsEditOpen(true);
//   };

//   const openDelete = (category: Category) => {
//     setSelectedCategory(category);
//     setIsDeleteOpen(true);
//   };

//   if (isLoading) {
//     return (
//       <div className="space-y-4">
//         <Skeleton className="h-10 w-full" />
//         <Skeleton className="h-96 w-full" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Card>
//         <CardContent className="py-12 text-center">
//           <p className="text-destructive">Failed to load categories</p>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">Category Management</h1>
//           <p className="text-muted-foreground mt-1">
//             Create and manage subject categories
//           </p>
//         </div>
//         <Button onClick={() => setIsCreateOpen(true)}>
//           <Plus className="h-4 w-4 mr-2" />
//           Add Category
//         </Button>
//       </div>

//       <Card>
//         <CardContent className="p-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search categories..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-9"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent className="p-0">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Slug</TableHead>
//                 <TableHead>Created</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredCategories?.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={4} className="text-center py-8">
//                     <p className="text-muted-foreground">No categories found</p>
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filteredCategories?.map((category: Category) => (
//                   <TableRow key={category.id}>
//                     <TableCell className="font-medium">
//                       {category.name}
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant="outline">{category.slug}</Badge>
//                     </TableCell>
//                     <TableCell>
//                       {category.createdAt
//                         ? format(new Date(category.createdAt), "MMM dd, yyyy")
//                         : "N/A"}
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <div className="flex justify-end gap-2">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => openEdit(category)}
//                         >
//                           <Edit className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="destructive"
//                           onClick={() => openDelete(category)}
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Create New Category</DialogTitle>
//             <DialogDescription>
//               Add a new subject category for tutors
//             </DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4 py-4">
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Category Name</label>
//               <Input
//                 placeholder="e.g., Mathematics"
//                 value={formData.name}
//                 onChange={(e) => handleNameChange(e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Slug</label>
//               <Input
//                 placeholder="e.g., mathematics"
//                 value={formData.slug}
//                 onChange={(e) =>
//                   setFormData({ ...formData, slug: e.target.value })
//                 }
//               />
//               <p className="text-xs text-muted-foreground">
//                 URL-friendly version of the name. Auto-generated from name.
//               </p>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleCreate} disabled={isCreating}>
//               {isCreating ? "Creating..." : "Create Category"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Category</DialogTitle>
//             <DialogDescription>Update category information</DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4 py-4">
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Category Name</label>
//               <Input
//                 placeholder="e.g., Mathematics"
//                 value={formData.name}
//                 onChange={(e) => handleNameChange(e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Slug</label>
//               <Input
//                 placeholder="e.g., mathematics"
//                 value={formData.slug}
//                 onChange={(e) =>
//                   setFormData({ ...formData, slug: e.target.value })
//                 }
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsEditOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleUpdate} disabled={isUpdating}>
//               {isUpdating ? "Updating..." : "Update Category"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. This will permanently delete the
//               category `{selectedCategory?.name}` and remove it from our
//               servers.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={handleDelete}
//               className="bg-destructive hover:bg-destructive/90"
//               disabled={isDeleting}
//             >
//               {isDeleting ? "Deleting..." : "Delete"}
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// }
