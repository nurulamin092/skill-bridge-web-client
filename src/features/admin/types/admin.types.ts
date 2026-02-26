export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  role: "STUDENT" | "TUTOR" | "ADMIN";
  isBanned: boolean;
  createdAt: string;
  tutorProfile?: {
    id: string;
    isApproved: boolean;
    hourlyRate: number;
    experience: number;
  };
}
export interface AdminStats {
  overview: {
    totalUsers: number;
    tutors: {
      total: number;
      approved: number;
      pending: number;
    };
    totalStudents: number;
    bookings: {
      total: number;
      today: number;
      byStatus: {
        confirmed: number;
        completed: number;
        cancel: number;
      };
    };
    revenue: {
      total: number;
      weekly: number;
    };
    pendingTutorApproved: number;
  };
  recentActivity: {
    users: Array<{
      id: string;
      name: string;
      email: string;
      image?: string;
      role: string;
      createdAt: string;
    }>;
    bookings: Array<{
      id: string;
      student: { name: string };
      tutor: { user: { name: string } };
      createdAt: string;
      status: string;
    }>;
  };
  categories: Array<{
    id: string;
    name: string;
    tutorCount: number;
  }>;
}
export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt?: string;
}

export interface DeleteCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
  onConfirm: () => void;
  loading?: boolean;
}
export interface CategoryFormData {
  name: string;
  slug: string;
}

export interface CategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  formData: CategoryFormData;
  setFormData: React.Dispatch<React.SetStateAction<CategoryFormData>>;
  onNameChange: (name: string) => void;
  onSubmit: () => void;
  loading?: boolean;
}
export interface CategoryTableProps {
  data: Category[];
  isLoading: boolean;
  error: unknown;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}
