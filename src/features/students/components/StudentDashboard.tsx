// "use client";

// import { useMyBookings } from "@/features/bookings/hooks/useBooking";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Calendar, Clock, Star, DollarSign } from "lucide-react";
// import { format } from "date-fns";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { BookingList } from "@/features/bookings/components/BookingList";

// interface StudentDashboardClientProps {
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     image?: string;
//   };
// }

// export function StudentDashboardClient({ user }: StudentDashboardClientProps) {
//   const { data: bookings, isLoading } = useMyBookings();

//   const upcomingBookings =
//     bookings?.filter(
//       (b) =>
//         b.status === "CONFIRMED" &&
//         new Date(b.availability.startTime) > new Date(),
//     ) || [];

//   const completedBookings =
//     bookings?.filter((b) => b.status === "COMPLETED") || [];

//   const stats = [
//     {
//       title: "Upcoming Sessions",
//       value: upcomingBookings.length,
//       icon: Calendar,
//       color: "text-blue-500",
//       bg: "bg-blue-100 dark:bg-blue-900/20",
//     },
//     {
//       title: "Completed Sessions",
//       value: completedBookings.length,
//       icon: Clock,
//       color: "text-green-500",
//       bg: "bg-green-100 dark:bg-green-900/20",
//     },
//     {
//       title: "Reviews Given",
//       value: bookings?.filter((b) => b.review).length || 0,
//       icon: Star,
//       color: "text-yellow-500",
//       bg: "bg-yellow-100 dark:bg-yellow-900/20",
//     },
//     {
//       title: "Total Spent",
//       value: `$${completedBookings.reduce((sum, b) => sum + (b.priceSnapshot || 0), 0)}`,
//       icon: DollarSign,
//       color: "text-purple-500",
//       bg: "bg-purple-100 dark:bg-purple-900/20",
//     },
//   ];

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
//         <p className="text-muted-foreground mt-1">
//           Here&apos;s what&apos;s happening with your learning journey
//         </p>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {stats.map((stat) => {
//           const Icon = stat.icon;
//           return (
//             <Card key={stat.title}>
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">
//                       {stat.title}
//                     </p>
//                     <p className="text-2xl font-bold mt-1">{stat.value}</p>
//                   </div>
//                   <div className={`p-3 rounded-full ${stat.bg}`}>
//                     <Icon className={`h-5 w-5 ${stat.color}`} />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       {upcomingBookings.length > 0 && (
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between">
//             <CardTitle>Next Sessions</CardTitle>
//             <Button variant="ghost" size="sm" asChild>
//               <Link href="/student/upcoming">View All</Link>
//             </Button>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {upcomingBookings.slice(0, 3).map((booking) => (
//                 <div
//                   key={booking.id}
//                   className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
//                 >
//                   <div>
//                     <p className="font-medium">{booking.tutor.user.name}</p>
//                     <p className="text-sm text-muted-foreground">
//                       {format(new Date(booking.availability.startTime), "PPP")}{" "}
//                       at{" "}
//                       {format(
//                         new Date(booking.availability.startTime),
//                         "h:mm a",
//                       )}
//                     </p>
//                   </div>
//                   <Button variant="outline" size="sm" asChild>
//                     <Link href={`/student/bookings/${booking.id}`}>
//                       Details
//                     </Link>
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       <div className="space-y-4">
//         <h2 className="text-2xl font-semibold">All Sessions</h2>
//         <Tabs defaultValue="upcoming" className="space-y-4">
//           <TabsList>
//             <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
//             <TabsTrigger value="past">Past Sessions</TabsTrigger>
//             <TabsTrigger value="all">All Bookings</TabsTrigger>
//           </TabsList>

//           <TabsContent value="upcoming">
//             <BookingList filter="upcoming" />
//           </TabsContent>

//           <TabsContent value="past">
//             <BookingList filter="past" />
//           </TabsContent>

//           <TabsContent value="all">
//             <BookingList filter="all" />
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useMyBookings } from "@/features/bookings/hooks/useBooking";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Calendar,
//   Clock,
//   Star,
//   DollarSign,
//   BookOpen,
//   Users,
// } from "lucide-react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { BookingList } from "@/features/bookings/components/BookingList";

// interface StudentDashboardClientProps {
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     image?: string;
//   };
// }

// export function StudentDashboardClient({ user }: StudentDashboardClientProps) {
//   const { data: bookings, isLoading } = useMyBookings();

//   const upcomingBookings =
//     bookings?.filter(
//       (b) =>
//         b.status === "CONFIRMED" &&
//         new Date(b.availability.startTime) > new Date(),
//     ) || [];

//   const completedBookings =
//     bookings?.filter((b) => b.status === "COMPLETED") || [];

//   const totalSessions = bookings?.length || 0;
//   const totalSpent = completedBookings.reduce(
//     (sum, b) => sum + (b.priceSnapshot || 0),
//     0,
//   );
//   const totalReviews = bookings?.filter((b) => b.review).length || 0;
//   const uniqueTutors = new Set(bookings?.map((b) => b.tutor.id)).size || 0;

//   const stats = [
//     {
//       title: "Upcoming Sessions",
//       value: upcomingBookings.length,
//       icon: Calendar,
//       color: "text-blue-500",
//       bg: "bg-blue-100 dark:bg-blue-900/20",
//     },
//     {
//       title: "Completed Sessions",
//       value: completedBookings.length,
//       icon: Clock,
//       color: "text-green-500",
//       bg: "bg-green-100 dark:bg-green-900/20",
//     },
//     {
//       title: "Reviews Given",
//       value: totalReviews,
//       icon: Star,
//       color: "text-yellow-500",
//       bg: "bg-yellow-100 dark:bg-yellow-900/20",
//     },
//     {
//       title: "Total Spent",
//       value: `$${totalSpent}`,
//       icon: DollarSign,
//       color: "text-purple-500",
//       bg: "bg-purple-100 dark:bg-purple-900/20",
//     },
//     {
//       title: "Total Sessions",
//       value: totalSessions,
//       icon: BookOpen,
//       color: "text-indigo-500",
//       bg: "bg-indigo-100 dark:bg-indigo-900/20",
//     },
//     {
//       title: "Unique Tutors",
//       value: uniqueTutors,
//       icon: Users,
//       color: "text-pink-500",
//       bg: "bg-pink-100 dark:bg-pink-900/20",
//     },
//   ];

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
//         <p className="text-muted-foreground mt-1">
//           Here&apos;s what&apos;s happening with your learning journey
//         </p>
//       </div>

//       <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
//         {stats.map((stat) => {
//           const Icon = stat.icon;
//           return (
//             <Card
//               key={stat.title}
//               className="hover:shadow-md transition-shadow"
//             >
//               <CardContent className="p-4">
//                 <div className="flex flex-col items-center text-center space-y-2">
//                   <div className={`p-2 rounded-full ${stat.bg}`}>
//                     <Icon className={`h-5 w-5 ${stat.color}`} />
//                   </div>
//                   <div>
//                     <p className="text-xs font-medium text-muted-foreground">
//                       {stat.title}
//                     </p>
//                     <p className="text-xl font-bold mt-1">{stat.value}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       <div className="flex gap-3">
//         <Button asChild variant="default">
//           <Link href="/tutors">Find a Tutor</Link>
//         </Button>
//         {upcomingBookings.length > 0 && (
//           <Button asChild variant="outline">
//             <Link href="/student/upcoming">View Upcoming</Link>
//           </Button>
//         )}
//       </div>

//       {upcomingBookings.length > 0 && (
//         <Card>
//           <CardContent className="p-6">
//             <h2 className="text-lg font-semibold mb-4">Next Sessions</h2>
//             <div className="space-y-4">
//               {upcomingBookings.slice(0, 3).map((booking) => (
//                 <div
//                   key={booking.id}
//                   className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
//                       <Calendar className="h-5 w-5 text-primary" />
//                     </div>
//                     <div>
//                       <p className="font-medium">{booking.tutor.user.name}</p>
//                       <p className="text-sm text-muted-foreground">
//                         {new Date(
//                           booking.availability.startTime,
//                         ).toLocaleDateString("en-US", {
//                           weekday: "short",
//                           month: "short",
//                           day: "numeric",
//                           hour: "numeric",
//                           minute: "numeric",
//                         })}
//                       </p>
//                     </div>
//                   </div>
//                   <Button variant="outline" size="sm" asChild>
//                     <Link href={`/student/bookings/${booking.id}`}>
//                       Details
//                     </Link>
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       <div className="space-y-4">
//         <h2 className="text-2xl font-semibold">All Sessions</h2>
//         <Tabs defaultValue="upcoming" className="space-y-4">
//           <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
//             <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
//             <TabsTrigger value="past">Past Sessions</TabsTrigger>
//             <TabsTrigger value="all">All Bookings</TabsTrigger>
//           </TabsList>

//           <TabsContent value="upcoming">
//             <BookingList filter="upcoming" />
//           </TabsContent>

//           <TabsContent value="past">
//             <BookingList filter="past" />
//           </TabsContent>

//           <TabsContent value="all">
//             <BookingList filter="all" />
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useMyBookings } from "@/features/bookings/hooks/useBooking";
// import { Card, CardContent } from "@/components/ui/card";
// import { Calendar, Clock, Star, DollarSign } from "lucide-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { BookingList } from "@/features/bookings/components/BookingList";

// interface StudentDashboardClientProps {
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     image?: string;
//   };
// }

// export function StudentDashboardClient({ user }: StudentDashboardClientProps) {
//   const { data: bookings, isLoading } = useMyBookings();

//   const upcomingBookings =
//     bookings?.filter(
//       (b) =>
//         b.status === "CONFIRMED" &&
//         new Date(b.availability.startTime) > new Date(),
//     ) || [];

//   const completedBookings =
//     bookings?.filter((b) => b.status === "COMPLETED") || [];

//   const stats = [
//     {
//       title: "Upcoming Sessions",
//       value: upcomingBookings.length,
//       icon: Calendar,
//       color: "text-blue-500",
//       bg: "bg-blue-100 dark:bg-blue-900/20",
//     },
//     {
//       title: "Completed Sessions",
//       value: completedBookings.length,
//       icon: Clock,
//       color: "text-green-500",
//       bg: "bg-green-100 dark:bg-green-900/20",
//     },
//     {
//       title: "Reviews Given",
//       value: bookings?.filter((b) => b.review).length || 0,
//       icon: Star,
//       color: "text-yellow-500",
//       bg: "bg-yellow-100 dark:bg-yellow-900/20",
//     },
//     {
//       title: "Total Spent",
//       value: `$${completedBookings.reduce((sum, b) => sum + (b.priceSnapshot || 0), 0)}`,
//       icon: DollarSign,
//       color: "text-purple-500",
//       bg: "bg-purple-100 dark:bg-purple-900/20",
//     },
//   ];

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 p-6">
//       {" "}
//       <div>
//         <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
//         <p className="text-muted-foreground mt-1">
//           Here&apos;s what&apos;s happening with your learning journey
//         </p>
//       </div>
//       <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
//         {stats.map((stat) => {
//           const Icon = stat.icon;
//           return (
//             <Card key={stat.title} className="overflow-hidden">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">
//                       {stat.title}
//                     </p>
//                     <p className="text-2xl font-bold mt-1">{stat.value}</p>
//                   </div>
//                   <div className={`p-3 rounded-full ${stat.bg} shrink-0`}>
//                     <Icon className={`h-5 w-5 ${stat.color}`} />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>
//       <div className="space-y-4">
//         <Tabs defaultValue="upcoming" className="space-y-4">
//           <TabsList className="inline-flex h-auto p-1">
//             <TabsTrigger value="upcoming" className="px-4 py-2">
//               Upcoming
//             </TabsTrigger>
//             <TabsTrigger value="past" className="px-4 py-2">
//               Past Sessions
//             </TabsTrigger>
//             <TabsTrigger value="all" className="px-4 py-2">
//               All Bookings
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="upcoming" className="mt-4">
//             <BookingList filter="upcoming" />
//           </TabsContent>

//           <TabsContent value="past" className="mt-4">
//             <BookingList filter="past" />
//           </TabsContent>

//           <TabsContent value="all" className="mt-4">
//             <BookingList filter="all" />
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useMyBookings } from "@/features/bookings/hooks/useBooking";
// import { Card, CardContent } from "@/components/ui/card";
// import { Calendar, Clock, Star, DollarSign } from "lucide-react";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { BookingList } from "@/features/bookings/components/BookingList";

// interface StudentDashboardClientProps {
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     image?: string;
//   };
// }

// export function StudentDashboardClient({ user }: StudentDashboardClientProps) {
//   const { data: bookings, isLoading } = useMyBookings();

//   const upcomingBookings =
//     bookings?.filter(
//       (b) =>
//         b.status === "CONFIRMED" &&
//         new Date(b.availability.startTime) > new Date(),
//     ) || [];

//   const completedBookings =
//     bookings?.filter((b) => b.status === "COMPLETED") || [];

//   const stats = [
//     {
//       title: "Upcoming Sessions",
//       value: upcomingBookings.length,
//       icon: Calendar,
//       color: "text-blue-500",
//       bg: "bg-blue-100 dark:bg-blue-900/20",
//     },
//     {
//       title: "Completed Sessions",
//       value: completedBookings.length,
//       icon: Clock,
//       color: "text-green-500",
//       bg: "bg-green-100 dark:bg-green-900/20",
//     },
//     {
//       title: "Reviews Given",
//       value: bookings?.filter((b) => b.review).length || 0,
//       icon: Star,
//       color: "text-yellow-500",
//       bg: "bg-yellow-100 dark:bg-yellow-900/20",
//     },
//     {
//       title: "Total Spent",
//       value: `$${completedBookings.reduce((sum, b) => sum + (b.priceSnapshot || 0), 0)}`,
//       icon: DollarSign,
//       color: "text-purple-500",
//       bg: "bg-purple-100 dark:bg-purple-900/20",
//     },
//   ];

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 p-6">
//       {" "}
//       {/* Main container padding */}
//       {/* 1. Welcome Section - margin bottom 24px (gap-6 = 24px) */}
//       <div>
//         <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
//         <p className="text-muted-foreground mt-1">
//           Here&apos;s what&apos;s happening with your learning journey
//         </p>
//       </div>
//       {/* 2. Stats Cards - grid with gap-4 (16px) */}
//       <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
//         {stats.map((stat) => {
//           const Icon = stat.icon;
//           return (
//             <Card key={stat.title} className="overflow-hidden">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">
//                       {stat.title}
//                     </p>
//                     <p className="text-2xl font-bold mt-1">{stat.value}</p>
//                   </div>
//                   <div className={`p-3 rounded-full ${stat.bg} shrink-0`}>
//                     <Icon className={`h-5 w-5 ${stat.color}`} />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>
//       {/* 3. Tabs Section - space-y-4 (16px) for inner spacing */}
//       <div className="space-y-4">
//         <Tabs defaultValue="upcoming" className="w-full">
//           <TabsList className="inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground">
//             <TabsTrigger
//               value="upcoming"
//               className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
//             >
//               Upcoming
//             </TabsTrigger>
//             <TabsTrigger
//               value="past"
//               className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
//             >
//               Past Sessions
//             </TabsTrigger>
//             <TabsTrigger
//               value="all"
//               className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
//             >
//               All Bookings
//             </TabsTrigger>
//           </TabsList>

//           {/* Tabs Content - each with mt-4 (16px) gap from tabs */}
//           <TabsContent
//             value="upcoming"
//             className="mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//           >
//             <BookingList filter="upcoming" />
//           </TabsContent>

//           <TabsContent
//             value="past"
//             className="mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//           >
//             <BookingList filter="past" />
//           </TabsContent>

//           <TabsContent
//             value="all"
//             className="mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//           >
//             <BookingList filter="all" />
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

"use client";

import { useMyBookings } from "@/features/bookings/hooks/useBooking";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Star, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingList } from "@/features/bookings/components/BookingList";

interface StudentDashboardClientProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}

export function StudentDashboardClient({ user }: StudentDashboardClientProps) {
  const { data: bookings, isLoading } = useMyBookings();

  const upcomingBookings =
    bookings?.filter(
      (b) =>
        b.status === "CONFIRMED" &&
        new Date(b.availability.startTime) > new Date(),
    ) || [];

  const completedBookings =
    bookings?.filter((b) => b.status === "COMPLETED") || [];

  const stats = [
    {
      title: "Upcoming Sessions",
      value: upcomingBookings.length,
      icon: Calendar,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Completed Sessions",
      value: completedBookings.length,
      icon: Clock,
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Reviews Given",
      value: bookings?.filter((b) => b.review).length || 0,
      icon: Star,
      color: "text-yellow-500",
      bg: "bg-yellow-100 dark:bg-yellow-900/20",
    },
    {
      title: "Total Spent",
      value: `$${completedBookings.reduce((sum, b) => sum + (b.priceSnapshot || 0), 0)}`,
      icon: DollarSign,
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/20",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Section 1: Welcome - টিউটরের মত */}
      <div className="mb-6">
        {" "}
        {/* gap-6 = 24px */}
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s what&apos;s happening with your learning journey
        </p>
      </div>

      {/* Section 2: Stats Cards - টিউটরের মত grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {" "}
        {/* gap-4 = 16px, mb-6 = 24px */}
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bg}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Section 3: Tabs - টিউটরের মত */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-4">
          {" "}
          {/* mb-4 = 16px */}
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <BookingList filter="upcoming" />
        </TabsContent>

        <TabsContent value="past">
          <BookingList filter="past" />
        </TabsContent>

        <TabsContent value="all">
          <BookingList filter="all" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
