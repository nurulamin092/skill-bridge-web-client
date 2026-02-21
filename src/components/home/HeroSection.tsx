"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const searchSchema = z.object({
  query: z.string().min(1, "Search query is required"),
});

type SearchForm = z.infer<typeof searchSchema>;

export function HeroSection() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data: SearchForm) => {
    router.push(`/tutors?search=${encodeURIComponent(data.query)}`);
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5" />

      <div className="container relative px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 mb-6 text-sm font-medium bg-primary/5">
            <span className="text-primary"> Learn from Expert Tutors</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Connect with Expert Tutors,{" "}
            <span className=" bg-linear-to-r  from-primary to-secondary bg-clip-text text-transparent">
              Learn Anything
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find the perfect tutor for your learning journey. Browse hundreds of
            expert tutors across various subjects and book sessions instantly.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for tutors, subjects, or topics..."
                  className="pl-10 h-12"
                  {...register("query")}
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-8">
                Search
              </Button>
            </div>
            {errors.query && (
              <p className="text-sm text-red-500 mt-1 text-left">
                {errors.query.message}
              </p>
            )}
          </form>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div>
              <div className="text-2xl md:text-3xl font-bold">500+</div>
              <div className="text-sm text-muted-foreground">Expert Tutors</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">50+</div>
              <div className="text-sm text-muted-foreground">Subjects</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">10k+</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
