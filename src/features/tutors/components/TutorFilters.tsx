// "use client";

// import { useForm, useWatch } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
// import { Search, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Slider } from "@/components/ui/slider";

// import { TutorQueryParams } from "../types/tutor.types";
// import { FilterForm, filterSchema } from "../schemas";
// import { useCategories } from "@/features/categories/hooks/useCategories";

// interface TutorFiltersProps {
//   onFilterChange: (filters: TutorQueryParams) => void;
//   initialFilters?: TutorQueryParams;
// }

// export function TutorFilters({
//   onFilterChange,
//   initialFilters = {},
// }: TutorFiltersProps) {
//   const { data: categories, isLoading: categoriesLoading } = useCategories();
//   const [priceRange, setPriceRange] = useState<[number, number]>([
//     initialFilters.minPrice || 0,
//     initialFilters.maxPrice || 100,
//   ]);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     control,
//     formState: { errors },
//   } = useForm<FilterForm>({
//     resolver: zodResolver(filterSchema),
//     defaultValues: {
//       search: initialFilters.search || "",
//       category: initialFilters.category || "",
//       minPrice: initialFilters.minPrice || 0,
//       maxPrice: initialFilters.maxPrice || 100,
//       rating: initialFilters.rating?.toString() || "",
//     },
//   });

//   const watchCategory = useWatch({ control, name: "category" });
//   const watchRating = useWatch({ control, name: "rating" });
//   const watchSearch = useWatch({ control, name: "search" });
//   const watchMinPrice = useWatch({ control, name: "minPrice" });
//   const watchMaxPrice = useWatch({ control, name: "maxPrice" });

//   const handlePriceChange = (value: number[]) => {
//     setPriceRange([value[0], value[1]]);
//     setValue("minPrice", value[0]);
//     setValue("maxPrice", value[1]);
//   };

//   const onSubmit = (data: FilterForm) => {
//     const filters: TutorQueryParams = {};

//     if (data.search?.trim()) {
//       filters.search = data.search.trim();
//     }

//     if (data.category && data.category !== "all") {
//       filters.category = data.category;
//     }

//     if (data.minPrice && data.minPrice > 0) {
//       filters.minPrice = data.minPrice;
//     }

//     if (data.maxPrice && data.maxPrice < 200) {
//       filters.maxPrice = data.maxPrice;
//     }

//     if (data.rating && data.rating !== "all") {
//       filters.rating = parseInt(data.rating);
//     }

//     onFilterChange(filters);
//   };

//   const handleClearFilters = () => {
//     reset({
//       search: "",
//       category: "",
//       minPrice: 0,
//       maxPrice: 100,
//       rating: "",
//     });
//     setPriceRange([0, 100]);
//     onFilterChange({});
//   };

//   const hasActiveFilters = Boolean(
//     watchSearch ||
//     (watchCategory && watchCategory !== "all") ||
//     (watchMinPrice && watchMinPrice > 0) ||
//     (watchMaxPrice && watchMaxPrice < 100) ||
//     (watchRating && watchRating !== "all"),
//   );

//   return (
//     <Card className="sticky top-20">
//       <CardHeader>
//         <CardTitle className="flex items-center justify-between">
//           <span>Filters</span>
//           {hasActiveFilters && (
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={handleClearFilters}
//               className="h-8 px-2 text-muted-foreground hover:text-foreground"
//               type="button"
//             >
//               <X className="h-4 w-4 mr-1" />
//               Clear
//             </Button>
//           )}
//         </CardTitle>
//       </CardHeader>

//       <CardContent className="space-y-6">
//         <div className="space-y-2">
//           <label htmlFor="search" className="text-sm font-medium">
//             Search
//           </label>
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               id="search"
//               placeholder="Search tutors..."
//               className="pl-9"
//               {...register("search")}
//             />
//           </div>
//           {errors.search && (
//             <p className="text-sm text-destructive">{errors.search.message}</p>
//           )}
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="category" className="text-sm font-medium">
//             Category
//           </label>
//           <Select
//             value={watchCategory}
//             onValueChange={(value) => setValue("category", value)}
//           >
//             <SelectTrigger id="category">
//               <SelectValue placeholder="All Categories" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Categories</SelectItem>
//               {categoriesLoading ? (
//                 <SelectItem value="loading" disabled>
//                   Loading...
//                 </SelectItem>
//               ) : (
//                 categories?.map((category) => (
//                   <SelectItem key={category.id} value={category.slug}>
//                     {category.name}
//                   </SelectItem>
//                 ))
//               )}
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="space-y-2">
//           <div className="flex justify-between items-center">
//             <label className="text-sm font-medium">Price Range ($/hr)</label>
//             <span className="text-sm text-muted-foreground">
//               ${priceRange[0]} - ${priceRange[1]}
//             </span>
//           </div>
//           <Slider
//             min={0}
//             max={200}
//             step={5}
//             value={priceRange}
//             onValueChange={handlePriceChange}
//             className="py-4"
//           />
//           <div className="flex justify-between text-xs text-muted-foreground">
//             <span>$0</span>
//             <span>$200+</span>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="rating" className="text-sm font-medium">
//             Minimum Rating
//           </label>
//           <Select
//             value={watchRating}
//             onValueChange={(value) => setValue("rating", value)}
//           >
//             <SelectTrigger id="rating">
//               <SelectValue placeholder="Any Rating" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">Any Rating</SelectItem>
//               <SelectItem value="4">4+ Stars</SelectItem>
//               <SelectItem value="3">3+ Stars</SelectItem>
//               <SelectItem value="2">2+ Stars</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </CardContent>

//       <CardFooter>
//         <Button onClick={handleSubmit(onSubmit)} className="w-full" size="lg">
//           Apply Filters
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
