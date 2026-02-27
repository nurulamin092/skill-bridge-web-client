import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default async function BookingSuccessPage() {
  const session = await getServerSession();

  if (!session || session.user.role !== "STUDENT") {
    redirect("/login");
  }

  return (
    <div className="container max-w-2xl py-12">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your session has been successfully booked. Check your email for
            confirmation details.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/student">Go to Dashboard</Link>
            </Button>
            <Button asChild>
              <Link href="/tutors">Browse More Tutors</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
