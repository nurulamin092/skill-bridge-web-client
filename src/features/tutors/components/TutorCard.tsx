import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TutorCardData } from "../types/tutor.types";
import { Badge } from "@/components/ui/badge";

interface TutorCardProps {
  tutor: TutorCardData;
}

export default function TutorCard({ tutor }: TutorCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{tutor.name}</CardTitle>
        <CardDescription>
          Hourly Rate: ${tutor.hourlyRate} | Experience: {tutor.experience} yrs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tutor.categories.map((cat) => (
            <Badge key={cat}>{cat}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
