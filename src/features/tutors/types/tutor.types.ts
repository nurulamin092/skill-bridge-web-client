import { CategoryTypes } from "@/features/categories/types/category.types";

export interface Tutor {
  id: string;
  bio?: string | null;
  hourlyRate: number;
  experience: number;
  avgRating: number;
  isApproved: boolean;

  user: {
    id: string;
    name: string;
    image?: string;
  };

  tutorCategories: {
    category: {
      id: string;
      name: string;
      slug: string;
    };
  }[];
  reviews?: {
    id: string;
    rating: number;
    comment: string;
    student: {
      id: string;
      name: string;
      image?: string;
    };
  };
}

export interface TutorCardData {
  id: string;
  name: string;
  hourlyRate: number;
  experience: number;
  rating: number;
  image?: string | null;
  bio?: string | null;
  categories: string[];
}

export interface SingleTutor {
  id: string;
  bio?: string | null;
  hourlyRate: number;
  experience: number;
  avgRating: number;

  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    phone?: string;
  };

  tutorCategories: {
    category: {
      id: string;
      name: string;
      slug: string;
    };
  }[];

  availabilities: {
    id: string;
    startTime: string;
    endTime: string;
  }[];

  reviews: {
    id: string;
    rating: number;
    comment: string;
    student: {
      id: string;
      name: string;
      image?: string;
    };
  }[];
}

export interface TutorQueryParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  featured?: boolean;
  image?: string | null;
  search?: string;
  bio?: string | null;
}

export interface TutorProfileData {
  id: string;
  bio: string | null;
  hourlyRate: number;
  experience: number;
  isApproved: boolean;
  tutorCategories: {
    category: CategoryTypes;
  }[];
}
export interface Session {
  id: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
  priceSnapshot: number;

  availability: {
    startTime: string;
    endTime: string;
  };

  student: {
    id: string;
    name: string;
    email: string;
  };
}

export type FilterType = "upcoming" | "past" | "all";

export const statusColors = {
  CONFIRMED:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  COMPLETED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  NO_SHOW: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
} as const;
