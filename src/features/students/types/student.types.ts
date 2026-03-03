export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StudentBooking {
  id: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
  priceSnapshot: number;
  createdAt: string;
  tutor: {
    id: string;
    hourlyRate: number;
    user: {
      name: string;
      image?: string;
    };
  };
  availability?: {
    startTime: string;
    endTime: string;
  };
}

export interface StudentDashboardStats {
  totalBookings: number;
  upcomingSession: number;
  completedSessions: number;
  totalSpent: number;
}

export interface StudentDashboardData {
  stats: StudentDashboardStats;
  upcomingBookings: StudentBooking[];
  pastBookings: StudentBooking[];
}

export interface UpdateStudentProfileData {
  name?: string;
  phone?: string;
}
