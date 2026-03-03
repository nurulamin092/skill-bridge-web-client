"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { StudentProfile } from "../../types/student.types";

interface PersonalInfoProps {
  profile: StudentProfile;
}

export function PersonalInfo({ profile }: PersonalInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <Label className="text-muted-foreground">Full Name</Label>
            <p className="font-medium">{profile.name}</p>
          </div>
          <div className="space-y-1">
            <Label className="text-muted-foreground">Email</Label>
            <p className="font-medium">{profile.email}</p>
          </div>
          <div className="space-y-1">
            <Label className="text-muted-foreground">Phone</Label>
            <p className="font-medium">{profile.phone || "Not provided"}</p>
          </div>
          <div className="space-y-1">
            <Label className="text-muted-foreground">Member Since</Label>
            <p className="font-medium">
              {new Date(profile.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
