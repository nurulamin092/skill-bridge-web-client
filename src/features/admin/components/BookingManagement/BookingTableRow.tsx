"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, Clock, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { Booking } from "./types";

interface BookingTableRowProps {
  booking: Booking;
  onViewDetails: (booking: Booking) => void;
  onCancelBooking?: (bookingId: string) => void;
}

const statusColors = {
  CONFIRMED:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  COMPLETED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  NO_SHOW: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
};

export function BookingTableRow({
  booking,
  onViewDetails,
}: BookingTableRowProps) {
  return (
    <TableRow
      className="cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => onViewDetails(booking)}
    >
      <TableCell>
        <div>
          <p className="font-medium">{booking.student.name}</p>
          <p className="text-sm text-muted-foreground">
            {booking.student.email}
          </p>
        </div>
      </TableCell>

      <TableCell>
        <p className="font-medium">{booking.tutor.user.name}</p>
        <p className="text-sm text-muted-foreground">
          {booking.tutor.user.email}
        </p>
      </TableCell>

      <TableCell>
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm">
            <Calendar className="h-3 w-3" />
            {format(new Date(booking.availability.startTime), "MMM dd, yyyy")}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            {format(new Date(booking.availability.startTime), "h:mm a")} -{" "}
            {format(new Date(booking.availability.endTime), "h:mm a")}
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-1">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">${booking.priceSnapshot}</span>
        </div>
      </TableCell>

      <TableCell>
        <Badge className={statusColors[booking.status]}>{booking.status}</Badge>
      </TableCell>

      <TableCell className="text-right">
        <div
          className="flex justify-end gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <Button size="sm" variant="outline">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
