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
