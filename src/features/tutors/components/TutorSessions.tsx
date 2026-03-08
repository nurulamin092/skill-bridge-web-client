"use client";

import { useState, useEffect } from "react";
import { format, isValid, parseISO } from "date-fns";
import { Calendar, Clock, User, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LoadingSkeleton } from "@/components/common/feedback/LoadingSkeleton";
import { ErrorState } from "@/components/common/feedback/ErrorState";
import { EmptyState } from "@/components/common/feedback/EmptyState";

import { FilterType, statusColors, Session } from "../types/tutor.types";
import {
  useTutorSessions,
  useUpdateSessionStatus,
} from "../hooks/useTutorSessions";

const formatDate = (dateString?: string): string => {
  if (!dateString) {
    console.log("formatDate: No date string provided");
    return "No date";
  }

  try {
    console.log("formatDate: Parsing date:", dateString);
    const date = parseISO(dateString);

    if (!isValid(date)) {
      console.log("formatDate: Invalid date:", dateString);
      return "Invalid date";
    }

    const formatted = format(date, "EEEE, MMM d, yyyy");
    console.log("formatDate: Formatted date:", formatted);
    return formatted;
  } catch (error) {
    console.error("formatDate: Error parsing date:", error);
    return "Invalid date";
  }
};

const formatTime = (dateString?: string): string => {
  if (!dateString) {
    console.log("formatTime: No date string provided");
    return "";
  }

  try {
    console.log("formatTime: Parsing time:", dateString);
    const date = parseISO(dateString);

    if (!isValid(date)) {
      console.log("formatTime: Invalid date for time:", dateString);
      return "Invalid time";
    }

    const formatted = format(date, "h:mm a");
    console.log("formatTime: Formatted time:", formatted);
    return formatted;
  } catch (error) {
    console.error("formatTime: Error parsing time:", error);
    return "Invalid time";
  }
};

export function TutorSessions() {
  console.log("🟢 TutorSessions component rendering");

  const [filter, setFilter] = useState<FilterType>("upcoming");
  const { data: sessions, isLoading, error, refetch } = useTutorSessions();
  const updateStatus = useUpdateSessionStatus();

  useEffect(() => {
    console.log("📊 Sessions data received:", sessions);
    if (sessions && sessions.length > 0) {
      console.log(
        "📊 First session structure:",
        JSON.stringify(sessions[0], null, 2),
      );
    }
  }, [sessions]);

  const now = new Date();
  console.log("📅 Current time:", now.toISOString());
  console.log("🔍 Current filter:", filter);

  const filteredSessions = sessions?.filter((session: Session) => {
    console.log(`\n--- Processing session: ${session.id} ---`);

    try {
      if (!session) {
        console.log("❌ Session is null/undefined");
        return false;
      }

      if (!session.availability) {
        console.log("❌ Session has no availability object:", session);
        return false;
      }

      const startTime = session.availability.startTime;
      console.log("⏰ Start time from API:", startTime);

      if (!startTime) {
        console.log("❌ No startTime in availability");
        return false;
      }

      console.log("🔍 Attempting to parse:", startTime);
      const sessionDate = parseISO(startTime);

      if (!isValid(sessionDate)) {
        console.log("❌ Invalid date after parsing");
        return false;
      }

      console.log("✅ Parsed date:", sessionDate.toISOString());
      console.log("📊 Session status:", session.status);

      if (filter === "upcoming") {
        const isUpcoming = sessionDate > now && session.status === "CONFIRMED";
        console.log("📈 Upcoming check result:", isUpcoming);
        return isUpcoming;
      }

      if (filter === "past") {
        const isPast = sessionDate <= now;
        console.log("📉 Past check result:", isPast);
        return isPast;
      }

      console.log("📋 All filter: including session");
      return true; // all
    } catch (error) {
      console.error("❌ Error in filter for session:", session.id, error);
      return false;
    }
  });

  console.log("📊 Filtered sessions count:", filteredSessions?.length);

  const handleMarkComplete = (bookingId: string) => {
    console.log("✅ Marking session as complete:", bookingId);
    updateStatus.mutate({ bookingId, status: "COMPLETED" });
  };

  const handleMarkNoShow = (bookingId: string) => {
    console.log("❌ Marking session as no-show:", bookingId);
    updateStatus.mutate({ bookingId, status: "NO_SHOW" });
  };

  // Loading state
  if (isLoading) {
    console.log("⏳ Loading sessions...");
    return <LoadingSkeleton type="card" rows={5} />;
  }

  // Error state
  if (error) {
    console.error("❌ Error loading sessions:", error);
    return <ErrorState message="Failed to load sessions" onRetry={refetch} />;
  }

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="upcoming"
        onValueChange={(value) => {
          console.log("🔄 Tab changed to:", value);
          setFilter(value as FilterType);
        }}
      >
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-4">
          {!filteredSessions || filteredSessions.length === 0 ? (
            <EmptyState
              icon={<Calendar className="h-12 w-12 text-muted-foreground" />}
              title="No sessions found"
              message={
                filter === "upcoming"
                  ? "You have no upcoming sessions."
                  : filter === "past"
                    ? "No past sessions found."
                    : "No sessions found."
              }
            />
          ) : (
            <div className="space-y-4">
              {filteredSessions.map((session: Session) => (
                <Card key={session.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {session.student?.name || "Unknown Student"}
                          </span>
                          <Badge className={statusColors[session.status]}>
                            {session.status}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 shrink-0" />
                          <span>
                            {formatDate(session.availability?.startTime)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 shrink-0" />
                          <span>
                            {formatTime(session.availability?.startTime)} -{" "}
                            {formatTime(session.availability?.endTime)}
                          </span>
                        </div>
                      </div>

                      {session.status === "CONFIRMED" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleMarkComplete(session.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mark Completed
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleMarkNoShow(session.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            No Show
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
