"use client";

import { useState } from "react";
import { format, isValid, parseISO } from "date-fns"; // ✅ parseISO এবং isValid import
import { Calendar, Clock, User, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LoadingSkeleton } from "@/components/common/feedback/LoadingSkeleton";
import { ErrorState } from "@/components/common/feedback/ErrorState";
import { EmptyState } from "@/components/common/feedback/EmptyState";

import { FilterType, statusColors } from "../types/tutor.types";
import {
  useTutorSessions,
  useUpdateSessionStatus,
} from "../hooks/useTutorSessions";

const formatDate = (dateString: string) => {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) {
      return "Invalid date";
    }
    return format(date, "EEEE, MMM d, yyyy");
  } catch {
    return "Invalid date";
  }
};

const formatTime = (dateString: string) => {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) {
      return "Invalid time";
    }
    return format(date, "h:mm a");
  } catch {
    return "Invalid time";
  }
};

export function TutorSessions() {
  const [filter, setFilter] = useState<FilterType>("upcoming");
  const { data: sessions, isLoading, error, refetch } = useTutorSessions();
  const updateStatus = useUpdateSessionStatus();

  const now = new Date();

  const filteredSessions = sessions?.filter((session) => {
    try {
      const sessionDate = parseISO(session.startTime);
      if (!isValid(sessionDate)) return false;

      if (filter === "upcoming") {
        return sessionDate > now && session.status === "CONFIRMED";
      }
      if (filter === "past") {
        return sessionDate <= now || session.status !== "CONFIRMED";
      }
      return true;
    } catch {
      return false;
    }
  });

  const handleMarkComplete = (bookingId: string) => {
    updateStatus.mutate({ bookingId, status: "COMPLETED" });
  };

  const handleMarkNoShow = (bookingId: string) => {
    updateStatus.mutate({ bookingId, status: "NO_SHOW" });
  };

  if (isLoading) {
    return <LoadingSkeleton type="card" rows={5} />;
  }

  if (error) {
    return <ErrorState message="Failed to load sessions" onRetry={refetch} />;
  }

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="upcoming"
        onValueChange={(value) => setFilter(value as FilterType)}
      >
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-4">
          {!filteredSessions?.length ? (
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
              {filteredSessions.map((session) => (
                <Card key={session.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {session.student.name}
                          </span>
                          <Badge className={statusColors[session.status]}>
                            {session.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {formatDate(session.startTime)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {formatTime(session.startTime)} -{" "}
                          {formatTime(session.endTime)}
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
