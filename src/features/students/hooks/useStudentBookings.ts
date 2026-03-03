import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { StudentBooking, StudentDashboardData } from "../types/student.types";

export function useStudentBookings() {
  return useQuery({
    queryKey: ["student-bookings"],
    queryFn: async (): Promise<StudentBooking[]> => {
      const response = await apiFetch<{
        success: boolean;
        data: StudentDashboardData;
      }>("/student/dashboard");

      console.log(" Raw API Response:", response);

      if (!response.success || !response.data) {
        throw new Error("Failed to fetch bookings");
      }

      const { upcomingBookings, pastBookings } = response.data;

      const bookings: StudentBooking[] = [
        ...(Array.isArray(upcomingBookings) ? upcomingBookings : []),
        ...(Array.isArray(pastBookings) ? pastBookings : []),
      ];

      console.log("✅ Processed bookings:", bookings);
      return bookings;
    },
  });
}
