"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingList } from "@/features/bookings/components/BookingList";

export function SessionsTabs() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">All Sessions</h2>
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <BookingList filter="upcoming" />
        </TabsContent>

        <TabsContent value="past">
          <BookingList filter="past" />
        </TabsContent>

        <TabsContent value="all">
          <BookingList filter="all" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
