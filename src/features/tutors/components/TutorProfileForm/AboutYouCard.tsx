"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProfileFormData } from "../../schemas";

interface AboutYouCardProps {
  register: UseFormRegister<ProfileFormData>;
  errors: FieldErrors<ProfileFormData>;
  bioLength: number;
}

export function AboutYouCard({
  register,
  errors,
  bioLength,
}: AboutYouCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About You</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell students about yourself, your teaching style, and expertise..."
            className="min-h-30"
            {...register("bio")}
          />
          {errors.bio && (
            <p className="text-sm text-destructive">{errors.bio.message}</p>
          )}
          <p className="text-xs text-muted-foreground text-right">
            {bioLength}/500 characters
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
