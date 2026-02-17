import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTutor } from "@/features/tutors/hooks/useTutor";
import { useParams } from "next/navigation";

export default function TutorDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data: tutor, isLoading, isError } = useTutor(id);
  if (isLoading) return <div>Loading...</div>;
  if (isError || !tutor) return <div>Tutor not found</div>;
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardContent>
          <h1 className="text-2xl font-bold">{tutor.user.name}</h1>

          <p className="text-muted-foreground">{tutor.bio}</p>
          <div className="flex gap-6 text-sm">
            <div> ${tutor.hourlyRate}/hr</div>
            <div> {tutor.experience} years experience</div>
            <div>{tutor.avgRating}</div>
          </div>
          <Button className="mt-4">Book Session</Button>
        </CardContent>
      </Card>
    </div>
  );
}
