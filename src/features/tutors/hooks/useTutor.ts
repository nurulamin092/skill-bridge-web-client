import { useQuery } from "@tanstack/react-query";
import { SingleTutor } from "../types/tutor.types";
import { getTutorById } from "../api/tutor.service";

export function useTutor(id: string) {
  return useQuery<SingleTutor>({
    queryKey: ["tutor", id],
    queryFn: () => getTutorById(id),
    enabled: !!id,
  });
}
