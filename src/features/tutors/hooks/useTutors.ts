import { useQuery } from "@tanstack/react-query";
import { getTutors } from "../api/tutor.service";
import { Tutor, TutorQueryParams } from "../types/tutor.types";

export function useTutors(params?: TutorQueryParams) {
  return useQuery<
    Tutor[],
    Error,
    Tutor[],
    [string, TutorQueryParams | undefined]
  >({
    queryKey: ["tutors", params],
    queryFn: () => getTutors(params),
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData,
  });
}
