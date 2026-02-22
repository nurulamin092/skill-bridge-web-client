"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Clock, AlertCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { createBooking } from "../services/booking.service";
import { SingleTutor } from "@/features/tutors/types/tutor.types";
import { cn } from "@/lib/utils";
import { bookingSchema, BookingForm } from "../schemas";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutor: SingleTutor;
}

export function BookingModal({ isOpen, onClose, tutor }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [step, setStep] = useState<"select" | "confirm">("select");
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
  });

  const selectedSlotId = useWatch({
    control,
    name: "availabilityId",
  });
  const { mutate, isPending } = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success("Booking confirmed! Check your email for details.");
      queryClient.invalidateQueries({ queryKey: ["tutor", tutor.id] });
      queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
      handleClose();
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to book session";
      toast.error(errorMessage);
    },
  });

  const handleClose = () => {
    reset();
    setStep("select");
    setSelectedDate(new Date());
    onClose();
  };

  const availabilities = tutor.availabilities?.filter((slot) => {
    if (!selectedDate) return true;
    const slotDate = new Date(slot.startTime);
    return (
      slotDate.getDate() === selectedDate.getDate() &&
      slotDate.getMonth() === selectedDate.getMonth() &&
      slotDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const selectedSlot = tutor.availabilities?.find(
    (slot) => slot.id === selectedSlotId,
  );

  const onSubmit = (data: BookingForm) => {
    mutate({ availabilityId: data.availabilityId });
  };

  const handleBack = () => {
    setStep("select");
  };

  const handleContinue = () => {
    if (selectedSlotId) {
      setStep("confirm");
    }
  };

  const isDateDisabled = (date: Date) => {
    const hasAvailability = tutor.availabilities?.some((slot) => {
      const slotDate = new Date(slot.startTime);
      return (
        slotDate.getDate() === date.getDate() &&
        slotDate.getMonth() === date.getMonth() &&
        slotDate.getFullYear() === date.getFullYear()
      );
    });
    return date < new Date() || !hasAvailability;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>
            {step === "select" ? "Book a Session" : "Confirm Booking"}
          </DialogTitle>
          <DialogDescription>
            {step === "select"
              ? "Select your preferred date and time slot"
              : "Review your booking details and confirm"}
          </DialogDescription>
        </DialogHeader>

        {step === "select" ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    autoFocus={false}
                    disabled={isDateDisabled}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Available Time Slots
                </label>
                {availabilities && availabilities.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {availabilities.map((slot) => (
                      <Card
                        key={slot.id}
                        className={cn(
                          "p-3 cursor-pointer hover:border-primary transition-colors",
                          selectedSlotId === slot.id &&
                            "border-primary bg-primary/5",
                        )}
                        onClick={() =>
                          setValue("availabilityId", slot.id, {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          })
                        }
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                          <div>
                            <p className="text-sm font-medium">
                              {format(new Date(slot.startTime), "h:mm a")}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(slot.endTime), "h:mm a")}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No available slots for this date
                  </p>
                )}
                {errors.availabilityId && (
                  <p className="text-sm text-destructive">
                    {errors.availabilityId.message}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {selectedSlot && (
              <>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Date & Time</p>
                  <p className="text-sm">
                    {format(
                      new Date(selectedSlot.startTime),
                      "EEEE, MMMM dd, yyyy",
                    )}
                  </p>
                  <p className="text-sm">
                    {format(new Date(selectedSlot.startTime), "h:mm a")} -{" "}
                    {format(new Date(selectedSlot.endTime), "h:mm a")}
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm font-medium">Tutor</p>
                  <p className="text-sm">{tutor.user.name}</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm font-medium">Price Details</p>
                  <div className="flex justify-between">
                    <span className="text-sm">1 hour session</span>
                    <span className="text-sm font-medium">
                      ${tutor.hourlyRate}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${tutor.hourlyRate}</span>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    By confirming, you agree to our cancellation policy. You can
                    cancel up to 24 hours before the session.
                  </AlertDescription>
                </Alert>
              </>
            )}
          </div>
        )}

        <DialogFooter className="flex gap-2 sm:gap-0">
          {step === "confirm" && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button
            onClick={
              step === "select" ? handleContinue : handleSubmit(onSubmit)
            }
            disabled={
              (step === "select" && !selectedSlotId) ||
              (step === "confirm" && isPending)
            }
          >
            {step === "select"
              ? "Continue"
              : isPending
                ? "Confirming..."
                : "Confirm Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
