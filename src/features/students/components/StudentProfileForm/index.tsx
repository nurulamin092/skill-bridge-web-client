"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useStudentProfile } from "../../hooks/useStudentProfile";
import { useUpdateStudentProfile } from "../../hooks/useUpdateStudentProfile";
import { updateProfileSchema, UpdateProfileFormData } from "../../schemas";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { FormActions } from "@/components/common/forms/FormActions";
import { LoadingSkeleton } from "@/components/common/feedback/LoadingSkeleton";
import { ErrorState } from "@/components/common/feedback/ErrorState";

export function StudentProfileForm() {
  const router = useRouter();
  const { data: profile, isLoading, error, refetch } = useStudentProfile();
  const { mutate: updateProfile, isPending } = useUpdateStudentProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: profile?.name || "",
      phone: profile?.phone || "",
    },
  });

  const onSubmit = (data: UpdateProfileFormData) => {
    updateProfile(data, {
      onSuccess: () => {
        router.push("/student/profile");
      },
    });
  };

  if (isLoading) {
    return <LoadingSkeleton type="card" rows={3} />;
  }

  if (error) {
    return <ErrorState message="Failed to load profile" onRetry={refetch} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <PersonalInfoForm
            register={register}
            errors={errors}
            defaultValues={{
              name: profile?.name,
              phone: profile?.phone || "",
            }}
          />

          <FormActions
            onCancel={() => router.push("/student/profile")}
            isPending={isPending}
            submitText="Update Profile"
          />
        </form>
      </CardContent>
    </Card>
  );
}
