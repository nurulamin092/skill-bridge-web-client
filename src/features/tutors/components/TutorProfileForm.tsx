"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

// Common Components
import { LoadingSkeleton } from "@/components/common/feedback/LoadingSkeleton";
import { ErrorState } from "@/components/common/feedback/ErrorState";
import { FormActions } from "@/components/common/forms/FormActions";
import { InfoCard } from "@/components/common/cards/InfoCard";

// Types & Schemas
import { CategoryTypes } from "@/features/categories/types/category.types";
import { ProfileFormData, profileSchema } from "../schemas";

// Hooks
import { useTutorProfile } from "../hooks/useTutorProfile";
import { useCategories } from "../hooks/useCategories";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useCreateProfile } from "../hooks/useCreateProfile";

// Category Checkbox Component
function CategoryCheckbox({
  category,
  checked,
  onChange,
}: {
  category: CategoryTypes;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      className={`
        flex items-center space-x-2 p-3 border rounded-lg cursor-pointer
        transition-colors hover:bg-muted/50
        ${checked ? "border-primary bg-primary/5" : ""}
      `}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-sm font-medium">{category.name}</span>
    </label>
  );
}

// Main Component
export function TutorProfileForm() {
  const router = useRouter();
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = useTutorProfile();

  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const updateProfile = useUpdateProfile();
  const createProfile = useCreateProfile();

  const isEditing = !!profile;

  const {
    register,
    handleSubmit,
    setValue,
    reset, // ✅ Reset function যোগ করুন
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      bio: profile?.bio || "",
      hourlyRate: profile?.hourlyRate || 50,
      experience: profile?.experience || 0,
      categoryIds: profile?.tutorCategories?.map((tc) => tc.category.id) || [],
    },
  });

  if (profile && selectedCategoryIds.length === 0) {
    const ids = profile.tutorCategories.map((tc) => tc.category.id);
    setSelectedCategoryIds(ids);
  }

  const bioLength = profile?.bio?.length || 0;

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);

    if (isEditing) {
      updateProfile.mutate(data, {
        onSuccess: () => {
          // ✅ Success - redirect to dashboard
          router.push("/tutor");
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      });
    } else {
      createProfile.mutate(data, {
        onSuccess: () => {
          // ✅ Reset form first
          reset({
            bio: "",
            hourlyRate: 50,
            experience: 0,
            categoryIds: [],
          });
          setSelectedCategoryIds([]);

          // ✅ Then redirect to dashboard
          router.push("/tutor");
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      });
    }
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newIds = checked
      ? [...selectedCategoryIds, categoryId]
      : selectedCategoryIds.filter((id) => id !== categoryId);

    setSelectedCategoryIds(newIds);
    setValue("categoryIds", newIds, { shouldValidate: true });
  };

  if (profileLoading || categoriesLoading) {
    return <LoadingSkeleton type="card" rows={4} />;
  }

  if (profileError) {
    return (
      <ErrorState message="Failed to load profile" onRetry={refetchProfile} />
    );
  }

  const isPending =
    updateProfile.isPending || createProfile.isPending || isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Bio Section */}
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

      <Card>
        <CardHeader>
          <CardTitle>Subjects You Teach</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoriesLoading ? (
              <LoadingSkeleton type="card" rows={2} />
            ) : (
              <>
                <div className="grid gap-2 grid-cols-2 md:grid-cols-3">
                  {categories?.map((category) => (
                    <CategoryCheckbox
                      key={category.id}
                      category={category}
                      checked={selectedCategoryIds.includes(category.id)}
                      onChange={(checked) =>
                        handleCategoryChange(category.id, checked)
                      }
                    />
                  ))}
                </div>
                {errors.categoryIds && (
                  <p className="text-sm text-destructive">
                    {errors.categoryIds.message}
                  </p>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <FormActions
        onCancel={() => router.push("/tutor")}
        isPending={isPending}
        submitText={isEditing ? "Update Profile" : "Create Profile"}
      />

      {!isEditing && (
        <InfoCard title="Note">
          <p className="text-sm text-muted-foreground">
            After creating your profile, it will be reviewed by admin.
            You&apos;ll be able to set your availability once approved.
          </p>
        </InfoCard>
      )}
    </form>
  );
}
