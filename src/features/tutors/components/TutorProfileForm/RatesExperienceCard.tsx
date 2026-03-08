"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProfileFormData } from "../../schemas";

interface RatesExperienceCardProps {
  register: UseFormRegister<ProfileFormData>;
  errors: FieldErrors<ProfileFormData>;
}

export function RatesExperienceCard({
  register,
  errors,
}: RatesExperienceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rates & Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="hourlyRate">Hourly Rate ($/hr)</Label>
            <Input
              id="hourlyRate"
              type="number"
              min="10"
              max="500"
              step="5"
              {...register("hourlyRate", { valueAsNumber: true })}
            />
            {errors.hourlyRate && (
              <p className="text-sm text-destructive">
                {errors.hourlyRate.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Input
              id="experience"
              type="number"
              min="0"
              max="50"
              {...register("experience", { valueAsNumber: true })}
            />
            {errors.experience && (
              <p className="text-sm text-destructive">
                {errors.experience.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
