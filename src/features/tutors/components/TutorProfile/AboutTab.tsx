"use client";

import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/common/feedback/EmptyState";

interface AboutTabProps {
  bio?: string | null;
  name: string;
}

export function AboutTab({ bio, name }: AboutTabProps) {
  if (!bio) {
    return (
      <EmptyState
        icon={<User className="h-12 w-12 text-muted-foreground" />}
        title="No Bio Available"
        message={`${name} hasn't added a bio yet.`}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>About {name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line leading-relaxed">{bio}</p>
      </CardContent>
    </Card>
  );
}
