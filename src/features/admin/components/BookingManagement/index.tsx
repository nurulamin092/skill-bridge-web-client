"use client";

import { useState } from "react";
import {
  useAdminBookings,
  useCancelBooking,
} from "../../hooks/useAdminBookings";

import { BookingTable } from "./BookingTable";
import { BookingDetailsDialog } from "./BookingDetailsDialog";
import { Booking } from "./types";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RefreshButton } from "../common/RefreshButton";
import { LoadingSkeleton } from "@/components/common/feedback/LoadingSkeleton";
import { ErrorState } from "@/components/common/feedback/ErrorState";
import { PageHeader } from "@/components/common/layout/PageHeader";
import { SearchFilter } from "@/components/common/data/SearchFilter";
import { EmptyState } from "@/components/common/feedback/EmptyState";

export function BookingManagement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data: bookings, isLoading, error, refetch } = useAdminBookings();
  const { mutate: cancelBooking } = useCancelBooking();

  const bookingList = Array.isArray(bookings) ? bookings : [];

  const filteredBookings = bookingList.filter((booking) => {
    const matchesSearch =
      booking.student.name.toLowerCase().includes(search.toLowerCase()) ||
      booking.student.email.toLowerCase().includes(search.toLowerCase()) ||
      booking.tutor.user.name.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };

  const handleCancelBooking = (bookingId: string) => {
    cancelBooking(bookingId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
        queryClient.refetchQueries({ queryKey: ["admin-bookings"] });
        toast.success("Booking cancelled successfully");
      },
    });
  };

  const handleRefresh = () => {
    refetch();
    toast.success("Data refreshed");
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  if (isLoading) {
    return <LoadingSkeleton rows={5} />;
  }

  if (error) {
    return (
      <ErrorState onRetry={handleRefresh} message="Failed to load bookings" />
    );
  }

  const hasFilters = search !== "" || statusFilter !== "all";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Booking Management"
        description="View and manage all platform bookings"
        action={
          <RefreshButton onRefresh={handleRefresh} isLoading={isLoading} />
        }
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchFilter
            value={search}
            onChange={setSearch}
            placeholder="Search by student or tutor..."
          />
        </div>
        <select
          className="w-full sm:w-48 px-3 py-2 border rounded-md"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="NO_SHOW">No Show</option>
        </select>
      </div>

      {filteredBookings.length === 0 ? (
        <EmptyState
          message={
            bookingList.length === 0
              ? "No bookings found"
              : "No matching bookings found"
          }
          clearSearch={hasFilters ? handleClearFilters : undefined}
        />
      ) : (
        <BookingTable
          bookings={filteredBookings}
          onViewDetails={handleViewDetails}
          onCancelBooking={handleCancelBooking}
        />
      )}

      <BookingDetailsDialog
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        booking={selectedBooking}
        onCancelBooking={handleCancelBooking}
      />
    </div>
  );
}
