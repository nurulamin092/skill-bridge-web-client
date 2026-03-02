import { TutorProfile } from "@/features/tutors/components/TutorProfile/index";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function TutorDetailsPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <div className="container mx-auto py-8">
      <TutorProfile id={id} />
    </div>
  );
}
export const dynamic = "force-dynamic";
