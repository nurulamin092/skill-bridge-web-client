"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookingTableRow } from "./BookingTableRow";
import { Booking } from "./types";

interface BookingTableProps {
  bookings: Booking[];
  onViewDetails: (booking: Booking) => void;
  onCancelBooking?: (bookingId: string) => void;
}

export function BookingTable({
  bookings,
  onViewDetails,
  onCancelBooking,
}: BookingTableProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Tutor</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <BookingTableRow
                key={booking.id}
                booking={booking}
                onViewDetails={onViewDetails}
                onCancelBooking={onCancelBooking}
              />
            ))}
          </TableBody>
        </Table>

        <div className="border-t px-4 py-3 text-sm text-muted-foreground">
          Showing {bookings.length} bookings
        </div>
      </CardContent>
    </Card>
  );
}
