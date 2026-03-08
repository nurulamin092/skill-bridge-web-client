"use client";

import { InfoCard } from "@/components/common/cards/InfoCard";

export function ProfileNote() {
  return (
    <InfoCard title="Note">
      <p className="text-sm text-muted-foreground">
        After creating your profile, it will be reviewed by admin. You&apos;ll
        be able to set your availability once approved.
      </p>
    </InfoCard>
  );
}
