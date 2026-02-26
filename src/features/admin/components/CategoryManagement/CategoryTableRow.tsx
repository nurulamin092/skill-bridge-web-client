"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Category } from "../../types/admin.types";

interface CategoryTableRowProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function CategoryTableRow({
  category,
  onEdit,
  onDelete,
}: CategoryTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{category.name}</TableCell>
      <TableCell>
        <Badge variant="outline">{category.slug}</Badge>
      </TableCell>
      <TableCell>
        {category.createdAt
          ? format(new Date(category.createdAt), "MMM dd, yyyy")
          : "N/A"}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline" onClick={() => onEdit(category)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(category)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
