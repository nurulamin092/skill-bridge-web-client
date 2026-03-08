"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { LoadingSkeleton } from "@/components/common/feedback/LoadingSkeleton";
import { ErrorState } from "@/components/common/feedback/ErrorState";
import { FormActions } from "@/components/common/forms/FormActions";

import { ProfileFormData, profileSchema } from "../../schemas";
import { useTutorProfile } from "../../hooks/useTutorProfile";
import { useCategories } from "../../hooks/useCategories";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import { useCreateProfile } from "../../hooks/useCreateProfile";

import { AboutYouCard } from "./AboutYouCard";
import { RatesExperienceCard } from "./RatesExperienceCard";
import { SubjectsCard } from "./SubjectsCard";
import { ProfileNote } from "./ProfileNote";

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
    reset,
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

  // Initialize selected categories from profile
  if (profile && selectedCategoryIds.length === 0 && profile.tutorCategories) {
    const ids = profile.tutorCategories.map((tc) => tc.category.id);
    setSelectedCategoryIds(ids);
    setValue("categoryIds", ids);
  }

  const bioLength = profile?.bio?.length || 0;

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);

    if (isEditing) {
      updateProfile.mutate(data, {
        onSuccess: () => {
          router.push("/tutor");
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      });
    } else {
      createProfile.mutate(data, {
        onSuccess: () => {
          reset({
            bio: "",
            hourlyRate: 50,
            experience: 0,
            categoryIds: [],
          });
          setSelectedCategoryIds([]);
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
      <ErrorState
        title="Failed to load profile"
        message={profileError.message}
        onRetry={refetchProfile}
      />
    );
  }

  const isPending =
    updateProfile.isPending || createProfile.isPending || isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <AboutYouCard register={register} errors={errors} bioLength={bioLength} />

      <RatesExperienceCard register={register} errors={errors} />

      <SubjectsCard
        categories={categories || []}
        selectedCategoryIds={selectedCategoryIds}
        onCategoryChange={handleCategoryChange}
        error={errors.categoryIds?.message}
        isLoading={categoriesLoading}
      />

      <FormActions
        onCancel={() => router.push("/tutor")}
        isPending={isPending}
        submitText={isEditing ? "Update Profile" : "Create Profile"}
      />

      {!isEditing && <ProfileNote />}
    </form>
  );
}
