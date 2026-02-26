"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface RecentUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  createdAt: string;
}

interface RecentBooking {
  id: string;
  student: {
    name: string;
  };
  tutor: {
    user: {
      name: string;
    };
  };
  createdAt: string;
  status: string;
}

interface RecentActivityProps {
  recentActivity?: {
    users?: RecentUser[];
    bookings?: RecentBooking[];
  };
}

export function RecentActivity({ recentActivity }: RecentActivityProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity?.users && recentActivity.users.length > 0 ? (
              recentActivity.users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(user.createdAt), "MMM dd")}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No recent users
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity?.bookings && recentActivity.bookings.length > 0 ? (
              recentActivity.bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{booking.student?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      with {booking.tutor?.user?.name}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(booking.createdAt), "MMM dd")}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No recent bookings
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
