export interface AvailabilitySlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface CreateAvailabilityData {
  startTime: string;
  endTime: string;
}
