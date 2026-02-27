import { TutorProfile } from "@/features/tutors/components/TutorProfile/index";

interface PageProps {
  params: {
    id: string;
  };
}

export default function TutorDetailsPage({ params }: PageProps) {
  return (
    <div className="container mx-auto py-8">
      <TutorProfile id={params.id} />
    </div>
  );
}
