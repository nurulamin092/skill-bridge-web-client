import { useQuery } from "@tanstack/react-query";
import { Tutor } from "../types/tutor.types";
import { getTutorById } from "../api/tutor.service";

export function useTutor(id: string) {
  return useQuery<Tutor>({
    queryKey: ["tutor", id],
    queryFn: () => getTutorById(id),
    enabled: !!id,
  });
}
