// // "use client";

// // import { useState } from "react";
// // import {
// //   useUpdateUserStatus,
// //   useApproveTutor,
// //   useAdminUsers,
// //   AdminUser,
// // } from "../hooks/useAdminUsers";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// // import { Skeleton } from "@/components/ui/skeleton";
// // import { Search, UserCheck, Ban, CheckCircle, RefreshCw } from "lucide-react";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog";
// // import { format } from "date-fns";
// // import { useQueryClient } from "@tanstack/react-query";
// // import { toast } from "sonner";

// // export function UserManagement() {
// //   const [search, setSearch] = useState("");
// //   const [roleFilter, setRoleFilter] = useState<string>("all");
// //   const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
// //   const [isDetailsOpen, setIsDetailsOpen] = useState(false);

// //   const queryClient = useQueryClient();
// //   const { data: users, isLoading, error, refetch } = useAdminUsers();
// //   const { mutate: updateUserStatus, isPending: isUpdating } =
// //     useUpdateUserStatus();
// //   const { mutate: approveTutor, isPending: isApproving } = useApproveTutor();

// //   // Filter users
// //   const filteredUsers = users?.filter((user: AdminUser) => {
// //     const matchesSearch =
// //       user.name.toLowerCase().includes(search.toLowerCase()) ||
// //       user.email.toLowerCase().includes(search.toLowerCase());

// //     const matchesRole = roleFilter === "all" || user.role === roleFilter;

// //     return matchesSearch && matchesRole;
// //   });

// //   const handleBanUser = (userId: string, currentStatus: boolean) => {
// //     updateUserStatus(
// //       { userId, isBanned: !currentStatus },
// //       {
// //         onSuccess: () => {
// //           queryClient.invalidateQueries({ queryKey: ["admin-users"] });
// //           queryClient.refetchQueries({ queryKey: ["admin-users"] });
// //           toast.success(
// //             currentStatus
// //               ? "User unbanned successfully"
// //               : "User banned successfully",
// //           );
// //         },
// //       },
// //     );
// //   };

// //   const handleApproveTutor = (tutorId: string) => {
// //     approveTutor(tutorId, {
// //       onSuccess: () => {
// //         queryClient.invalidateQueries({ queryKey: ["admin-users"] });
// //         queryClient.refetchQueries({ queryKey: ["admin-users"] });
// //         toast.success("Tutor approved successfully");
// //       },
// //     });
// //   };

// //   const handleRefresh = () => {
// //     refetch();
// //     toast.success("Data refreshed");
// //   };

// //   const viewUserDetails = (user: AdminUser) => {
// //     setSelectedUser(user);
// //     setIsDetailsOpen(true);
// //   };

// //   const getRoleBadge = (role: string) => {
// //     const styles = {
// //       ADMIN:
// //         "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
// //       TUTOR:
// //         "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
// //       STUDENT: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
// //     };
// //     return styles[role as keyof typeof styles] || "";
// //   };

// //   const getInitials = (name: string) => {
// //     return name
// //       .split(" ")
// //       .map((n) => n[0])
// //       .join("")
// //       .toUpperCase()
// //       .slice(0, 2);
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="space-y-4">
// //         <div className="flex justify-between items-center">
// //           <Skeleton className="h-10 w-64" />
// //           <Skeleton className="h-10 w-24" />
// //         </div>
// //         <Skeleton className="h-24 w-full" />
// //         <Skeleton className="h-96 w-full" />
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Card>
// //         <CardContent className="py-12 text-center">
// //           <p className="text-destructive mb-4">Failed to load users</p>
// //           <Button onClick={handleRefresh} variant="outline">
// //             <RefreshCw className="h-4 w-4 mr-2" />
// //             Try Again
// //           </Button>
// //         </CardContent>
// //       </Card>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       {/* Header with Refresh */}
// //       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //         <div>
// //           <h1 className="text-3xl font-bold">User Management</h1>
// //           <p className="text-muted-foreground mt-1">
// //             Manage students, tutors, and administrators
// //           </p>
// //         </div>
// //         <Button variant="outline" onClick={handleRefresh} size="sm">
// //           <RefreshCw className="h-4 w-4 mr-2" />
// //           Refresh
// //         </Button>
// //       </div>

// //       {/* Filters */}
// //       <Card>
// //         <CardContent className="p-6">
// //           <div className="flex flex-col sm:flex-row gap-4">
// //             <div className="flex-1 relative">
// //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// //               <Input
// //                 placeholder="Search by name or email..."
// //                 value={search}
// //                 onChange={(e) => setSearch(e.target.value)}
// //                 className="pl-9"
// //               />
// //             </div>
// //             <Select value={roleFilter} onValueChange={setRoleFilter}>
// //               <SelectTrigger className="w-full sm:w-48">
// //                 <SelectValue placeholder="Filter by role" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="all">All Roles</SelectItem>
// //                 <SelectItem value="ADMIN">Admins</SelectItem>
// //                 <SelectItem value="TUTOR">Tutors</SelectItem>
// //                 <SelectItem value="STUDENT">Students</SelectItem>
// //               </SelectContent>
// //             </Select>
// //           </div>
// //         </CardContent>
// //       </Card>

// //       {/* Users Table */}
// //       <Card>
// //         <CardContent className="p-0">
// //           <Table>
// //             <TableHeader>
// //               <TableRow>
// //                 <TableHead>User</TableHead>
// //                 <TableHead>Role</TableHead>
// //                 <TableHead>Status</TableHead>
// //                 <TableHead>Joined</TableHead>
// //                 <TableHead className="text-right">Actions</TableHead>
// //               </TableRow>
// //             </TableHeader>
// //             <TableBody>
// //               {filteredUsers?.length === 0 ? (
// //                 <TableRow>
// //                   <TableCell colSpan={5} className="text-center py-12">
// //                     <p className="text-muted-foreground">No users found</p>
// //                     {search && (
// //                       <Button
// //                         variant="link"
// //                         onClick={() => setSearch("")}
// //                         className="mt-2"
// //                       >
// //                         Clear search
// //                       </Button>
// //                     )}
// //                   </TableCell>
// //                 </TableRow>
// //               ) : (
// //                 filteredUsers?.map((user: AdminUser) => (
// //                   <TableRow
// //                     key={user.id}
// //                     className="cursor-pointer hover:bg-muted/50 transition-colors"
// //                     onClick={() => viewUserDetails(user)}
// //                   >
// //                     <TableCell>
// //                       <div className="flex items-center gap-3">
// //                         <Avatar className="h-8 w-8">
// //                           <AvatarImage src={user.image || ""} alt={user.name} />
// //                           <AvatarFallback>
// //                             {getInitials(user.name)}
// //                           </AvatarFallback>
// //                         </Avatar>
// //                         <div>
// //                           <p className="font-medium">{user.name}</p>
// //                           <p className="text-sm text-muted-foreground">
// //                             {user.email}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </TableCell>
// //                     <TableCell>
// //                       <Badge className={getRoleBadge(user.role)}>
// //                         {user.role}
// //                       </Badge>
// //                     </TableCell>
// //                     <TableCell>
// //                       {user.isBanned ? (
// //                         <Badge variant="destructive">Banned</Badge>
// //                       ) : user.role === "TUTOR" && user.tutorProfile ? (
// //                         user.tutorProfile.isApproved ? (
// //                           <Badge className="bg-green-100 text-green-800">
// //                             Approved
// //                           </Badge>
// //                         ) : (
// //                           <Badge variant="outline" className="text-yellow-600">
// //                             Pending
// //                           </Badge>
// //                         )
// //                       ) : (
// //                         <Badge variant="outline" className="text-green-600">
// //                           Active
// //                         </Badge>
// //                       )}
// //                     </TableCell>
// //                     <TableCell>
// //                       {format(new Date(user.createdAt), "MMM dd, yyyy")}
// //                     </TableCell>
// //                     <TableCell className="text-right">
// //                       <div
// //                         className="flex justify-end gap-2"
// //                         onClick={(e) => e.stopPropagation()}
// //                       >
// //                         {user.role === "TUTOR" &&
// //                           user.tutorProfile &&
// //                           !user.tutorProfile.isApproved && (
// //                             <Button
// //                               size="sm"
// //                               variant="outline"
// //                               className="text-green-600 hover:text-green-700"
// //                               onClick={() =>
// //                                 handleApproveTutor(user.tutorProfile!.id)
// //                               }
// //                               disabled={isApproving}
// //                             >
// //                               <CheckCircle className="h-4 w-4 mr-1" />
// //                               Approve
// //                             </Button>
// //                           )}
// //                         <Button
// //                           size="sm"
// //                           variant={user.isBanned ? "outline" : "destructive"}
// //                           onClick={() => handleBanUser(user.id, user.isBanned)}
// //                           disabled={isUpdating}
// //                         >
// //                           {user.isBanned ? (
// //                             <>
// //                               <UserCheck className="h-4 w-4 mr-1" />
// //                               Unban
// //                             </>
// //                           ) : (
// //                             <>
// //                               <Ban className="h-4 w-4 mr-1" />
// //                               Ban
// //                             </>
// //                           )}
// //                         </Button>
// //                       </div>
// //                     </TableCell>
// //                   </TableRow>
// //                 ))
// //               )}
// //             </TableBody>
// //           </Table>

// //           {/* Table Footer with Count */}
// //           {filteredUsers && filteredUsers.length > 0 && (
// //             <div className="border-t px-4 py-3 text-sm text-muted-foreground">
// //               Showing {filteredUsers.length} of {users?.length || 0} users
// //             </div>
// //           )}
// //         </CardContent>
// //       </Card>

// //       {/* User Details Dialog */}
// //       <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
// //         <DialogContent className="max-w-2xl">
// //           <DialogHeader>
// //             <DialogTitle>User Details</DialogTitle>
// //             <DialogDescription>
// //               Complete information about this user
// //             </DialogDescription>
// //           </DialogHeader>

// //           {selectedUser && (
// //             <div className="space-y-6">
// //               {/* User Header */}
// //               <div className="flex items-center gap-4">
// //                 <Avatar className="h-16 w-16">
// //                   <AvatarImage
// //                     src={selectedUser.image || ""}
// //                     alt={selectedUser.name}
// //                   />
// //                   <AvatarFallback className="text-lg">
// //                     {getInitials(selectedUser.name)}
// //                   </AvatarFallback>
// //                 </Avatar>
// //                 <div className="flex-1">
// //                   <h2 className="text-xl font-bold">{selectedUser.name}</h2>
// //                   <p className="text-muted-foreground">{selectedUser.email}</p>
// //                   <div className="flex gap-2 mt-2">
// //                     <Badge className={getRoleBadge(selectedUser.role)}>
// //                       {selectedUser.role}
// //                     </Badge>
// //                     {selectedUser.isBanned && (
// //                       <Badge variant="destructive">Banned</Badge>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* User Information Grid */}
// //               <div className="grid gap-4 md:grid-cols-2">
// //                 {/* Basic Info Card */}
// //                 <Card>
// //                   <CardContent className="p-4">
// //                     <h3 className="font-semibold mb-3">Basic Information</h3>
// //                     <div className="space-y-2 text-sm">
// //                       <div className="flex justify-between">
// //                         <span className="text-muted-foreground">User ID:</span>
// //                         <span className="font-mono text-xs">
// //                           {selectedUser.id}
// //                         </span>
// //                       </div>
// //                       <div className="flex justify-between">
// //                         <span className="text-muted-foreground">Joined:</span>
// //                         <span>
// //                           {format(new Date(selectedUser.createdAt), "PPP")}
// //                         </span>
// //                       </div>
// //                       <div className="flex justify-between">
// //                         <span className="text-muted-foreground">Status:</span>
// //                         <span
// //                           className={
// //                             selectedUser.isBanned
// //                               ? "text-destructive"
// //                               : "text-green-600"
// //                           }
// //                         >
// //                           {selectedUser.isBanned ? "Banned" : "Active"}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </CardContent>
// //                 </Card>

// //                 {/* Tutor Profile Card (if user is tutor) */}
// //                 {selectedUser.role === "TUTOR" && selectedUser.tutorProfile && (
// //                   <Card>
// //                     <CardContent className="p-4">
// //                       <h3 className="font-semibold mb-3">Tutor Profile</h3>
// //                       <div className="space-y-2 text-sm">
// //                         <div className="flex justify-between">
// //                           <span className="text-muted-foreground">
// //                             Approval Status:
// //                           </span>
// //                           <Badge
// //                             className={
// //                               selectedUser.tutorProfile.isApproved
// //                                 ? "bg-green-100 text-green-800"
// //                                 : "bg-yellow-100 text-yellow-800"
// //                             }
// //                           >
// //                             {selectedUser.tutorProfile.isApproved
// //                               ? "Approved"
// //                               : "Pending"}
// //                           </Badge>
// //                         </div>
// //                         {selectedUser.tutorProfile.hourlyRate && (
// //                           <div className="flex justify-between">
// //                             <span className="text-muted-foreground">
// //                               Hourly Rate:
// //                             </span>
// //                             <span className="font-medium">
// //                               ${selectedUser.tutorProfile.hourlyRate}/hr
// //                             </span>
// //                           </div>
// //                         )}
// //                         {selectedUser.tutorProfile.experience && (
// //                           <div className="flex justify-between">
// //                             <span className="text-muted-foreground">
// //                               Experience:
// //                             </span>
// //                             <span>
// //                               {selectedUser.tutorProfile.experience} years
// //                             </span>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </CardContent>
// //                   </Card>
// //                 )}
// //               </div>

// //               {/* Action Buttons */}
// //               <div className="flex justify-end gap-3 border-t pt-4">
// //                 {selectedUser.role === "TUTOR" &&
// //                   selectedUser.tutorProfile &&
// //                   !selectedUser.tutorProfile.isApproved && (
// //                     <Button
// //                       variant="default"
// //                       className="bg-green-600 hover:bg-green-700"
// //                       onClick={() => {
// //                         handleApproveTutor(selectedUser.tutorProfile!.id);
// //                         setIsDetailsOpen(false);
// //                       }}
// //                     >
// //                       <CheckCircle className="h-4 w-4 mr-2" />
// //                       Approve Tutor
// //                     </Button>
// //                   )}
// //                 <Button
// //                   variant={selectedUser.isBanned ? "outline" : "destructive"}
// //                   onClick={() => {
// //                     handleBanUser(selectedUser.id, selectedUser.isBanned);
// //                     setIsDetailsOpen(false);
// //                   }}
// //                 >
// //                   {selectedUser.isBanned ? (
// //                     <>
// //                       <UserCheck className="h-4 w-4 mr-2" />
// //                       Unban User
// //                     </>
// //                   ) : (
// //                     <>
// //                       <Ban className="h-4 w-4 mr-2" />
// //                       Ban User
// //                     </>
// //                   )}
// //                 </Button>
// //               </div>
// //             </div>
// //           )}
// //         </DialogContent>
// //       </Dialog>
// //     </div>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import {
//   useUpdateUserStatus,
//   useApproveTutor,
//   useAdminUsers,
//   AdminUser,
// } from "../hooks/useAdminUsers";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Search, UserCheck, Ban, CheckCircle, RefreshCw } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { format } from "date-fns";
// import { useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";

// export function UserManagement() {
//   const [search, setSearch] = useState("");
//   const [roleFilter, setRoleFilter] = useState<string>("all");
//   const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
//   const [isDetailsOpen, setIsDetailsOpen] = useState(false);

//   const queryClient = useQueryClient();
//   const { data: users, isLoading, error, refetch } = useAdminUsers();
//   const { mutate: updateUserStatus, isPending: isUpdating } =
//     useUpdateUserStatus();
//   const { mutate: approveTutor, isPending: isApproving } = useApproveTutor();

//   // 🔴 FIX: Safe check - ensure users is array
//   const userList = Array.isArray(users) ? users : [];

//   // Filter users with safe check
//   const filteredUsers = userList.filter((user: AdminUser) => {
//     const matchesSearch =
//       user.name.toLowerCase().includes(search.toLowerCase()) ||
//       user.email.toLowerCase().includes(search.toLowerCase());

//     const matchesRole = roleFilter === "all" || user.role === roleFilter;

//     return matchesSearch && matchesRole;
//   });

//   const handleBanUser = (userId: string, currentStatus: boolean) => {
//     updateUserStatus(
//       { userId, isBanned: !currentStatus },
//       {
//         onSuccess: () => {
//           queryClient.invalidateQueries({ queryKey: ["admin-users"] });
//           queryClient.refetchQueries({ queryKey: ["admin-users"] });
//           toast.success(
//             currentStatus
//               ? "User unbanned successfully"
//               : "User banned successfully",
//           );
//         },
//       },
//     );
//   };

//   const handleApproveTutor = (tutorId: string) => {
//     approveTutor(tutorId, {
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["admin-users"] });
//         queryClient.refetchQueries({ queryKey: ["admin-users"] });
//         toast.success("Tutor approved successfully");
//       },
//     });
//   };

//   const handleRefresh = () => {
//     refetch();
//     toast.success("Data refreshed");
//   };

//   const viewUserDetails = (user: AdminUser) => {
//     setSelectedUser(user);
//     setIsDetailsOpen(true);
//   };

//   const getRoleBadge = (role: string) => {
//     const styles = {
//       ADMIN:
//         "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
//       TUTOR:
//         "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
//       STUDENT: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
//     };
//     return styles[role as keyof typeof styles] || "";
//   };

//   const getInitials = (name: string) => {
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   if (isLoading) {
//     return (
//       <div className="space-y-4">
//         <div className="flex justify-between items-center">
//           <Skeleton className="h-10 w-64" />
//           <Skeleton className="h-10 w-24" />
//         </div>
//         <Skeleton className="h-24 w-full" />
//         <Skeleton className="h-96 w-full" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Card>
//         <CardContent className="py-12 text-center">
//           <p className="text-destructive mb-4">Failed to load users</p>
//           <Button onClick={handleRefresh} variant="outline">
//             <RefreshCw className="h-4 w-4 mr-2" />
//             Try Again
//           </Button>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header with Refresh */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold">User Management</h1>
//           <p className="text-muted-foreground mt-1">
//             Manage students, tutors, and administrators
//           </p>
//         </div>
//         <Button variant="outline" onClick={handleRefresh} size="sm">
//           <RefreshCw className="h-4 w-4 mr-2" />
//           Refresh
//         </Button>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardContent className="p-6">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search by name or email..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="pl-9"
//               />
//             </div>
//             <Select value={roleFilter} onValueChange={setRoleFilter}>
//               <SelectTrigger className="w-full sm:w-48">
//                 <SelectValue placeholder="Filter by role" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Roles</SelectItem>
//                 <SelectItem value="ADMIN">Admins</SelectItem>
//                 <SelectItem value="TUTOR">Tutors</SelectItem>
//                 <SelectItem value="STUDENT">Students</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Users Table */}
//       <Card>
//         <CardContent className="p-0">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>User</TableHead>
//                 <TableHead>Role</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Joined</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredUsers.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={5} className="text-center py-12">
//                     <p className="text-muted-foreground">
//                       {userList.length === 0
//                         ? "No users found"
//                         : "No matching users found"}
//                     </p>
//                     {search && (
//                       <Button
//                         variant="link"
//                         onClick={() => setSearch("")}
//                         className="mt-2"
//                       >
//                         Clear search
//                       </Button>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filteredUsers.map((user: AdminUser) => (
//                   <TableRow
//                     key={user.id}
//                     className="cursor-pointer hover:bg-muted/50 transition-colors"
//                     onClick={() => viewUserDetails(user)}
//                   >
//                     <TableCell>
//                       <div className="flex items-center gap-3">
//                         <Avatar className="h-8 w-8">
//                           <AvatarImage src={user.image || ""} alt={user.name} />
//                           <AvatarFallback>
//                             {getInitials(user.name)}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <p className="font-medium">{user.name}</p>
//                           <p className="text-sm text-muted-foreground">
//                             {user.email}
//                           </p>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <Badge className={getRoleBadge(user.role)}>
//                         {user.role}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       {user.isBanned ? (
//                         <Badge variant="destructive">Banned</Badge>
//                       ) : user.role === "TUTOR" && user.tutorProfile ? (
//                         user.tutorProfile.isApproved ? (
//                           <Badge className="bg-green-100 text-green-800">
//                             Approved
//                           </Badge>
//                         ) : (
//                           <Badge variant="outline" className="text-yellow-600">
//                             Pending
//                           </Badge>
//                         )
//                       ) : (
//                         <Badge variant="outline" className="text-green-600">
//                           Active
//                         </Badge>
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       {format(new Date(user.createdAt), "MMM dd, yyyy")}
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <div
//                         className="flex justify-end gap-2"
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         {user.role === "TUTOR" &&
//                           user.tutorProfile &&
//                           !user.tutorProfile.isApproved && (
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               className="text-green-600 hover:text-green-700"
//                               onClick={() =>
//                                 handleApproveTutor(user.tutorProfile!.id)
//                               }
//                               disabled={isApproving}
//                             >
//                               <CheckCircle className="h-4 w-4 mr-1" />
//                               Approve
//                             </Button>
//                           )}
//                         <Button
//                           size="sm"
//                           variant={user.isBanned ? "outline" : "destructive"}
//                           onClick={() => handleBanUser(user.id, user.isBanned)}
//                           disabled={isUpdating}
//                         >
//                           {user.isBanned ? (
//                             <>
//                               <UserCheck className="h-4 w-4 mr-1" />
//                               Unban
//                             </>
//                           ) : (
//                             <>
//                               <Ban className="h-4 w-4 mr-1" />
//                               Ban
//                             </>
//                           )}
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>

//           {/* Table Footer with Count */}
//           {filteredUsers.length > 0 && (
//             <div className="border-t px-4 py-3 text-sm text-muted-foreground">
//               Showing {filteredUsers.length} of {userList.length} users
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* User Details Dialog */}
//       <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>User Details</DialogTitle>
//             <DialogDescription>
//               Complete information about this user
//             </DialogDescription>
//           </DialogHeader>

//           {selectedUser && (
//             <div className="space-y-6">
//               {/* User Header */}
//               <div className="flex items-center gap-4">
//                 <Avatar className="h-16 w-16">
//                   <AvatarImage
//                     src={selectedUser.image || ""}
//                     alt={selectedUser.name}
//                   />
//                   <AvatarFallback className="text-lg">
//                     {getInitials(selectedUser.name)}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="flex-1">
//                   <h2 className="text-xl font-bold">{selectedUser.name}</h2>
//                   <p className="text-muted-foreground">{selectedUser.email}</p>
//                   <div className="flex gap-2 mt-2">
//                     <Badge className={getRoleBadge(selectedUser.role)}>
//                       {selectedUser.role}
//                     </Badge>
//                     {selectedUser.isBanned && (
//                       <Badge variant="destructive">Banned</Badge>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* User Information Grid */}
//               <div className="grid gap-4 md:grid-cols-2">
//                 {/* Basic Info Card */}
//                 <Card>
//                   <CardContent className="p-4">
//                     <h3 className="font-semibold mb-3">Basic Information</h3>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">User ID:</span>
//                         <span className="font-mono text-xs">
//                           {selectedUser.id}
//                         </span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Joined:</span>
//                         <span>
//                           {format(new Date(selectedUser.createdAt), "PPP")}
//                         </span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Status:</span>
//                         <span
//                           className={
//                             selectedUser.isBanned
//                               ? "text-destructive"
//                               : "text-green-600"
//                           }
//                         >
//                           {selectedUser.isBanned ? "Banned" : "Active"}
//                         </span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Tutor Profile Card (if user is tutor) */}
//                 {selectedUser.role === "TUTOR" && selectedUser.tutorProfile && (
//                   <Card>
//                     <CardContent className="p-4">
//                       <h3 className="font-semibold mb-3">Tutor Profile</h3>
//                       <div className="space-y-2 text-sm">
//                         <div className="flex justify-between">
//                           <span className="text-muted-foreground">
//                             Approval Status:
//                           </span>
//                           <Badge
//                             className={
//                               selectedUser.tutorProfile.isApproved
//                                 ? "bg-green-100 text-green-800"
//                                 : "bg-yellow-100 text-yellow-800"
//                             }
//                           >
//                             {selectedUser.tutorProfile.isApproved
//                               ? "Approved"
//                               : "Pending"}
//                           </Badge>
//                         </div>
//                         {selectedUser.tutorProfile.hourlyRate && (
//                           <div className="flex justify-between">
//                             <span className="text-muted-foreground">
//                               Hourly Rate:
//                             </span>
//                             <span className="font-medium">
//                               ${selectedUser.tutorProfile.hourlyRate}/hr
//                             </span>
//                           </div>
//                         )}
//                         {selectedUser.tutorProfile.experience && (
//                           <div className="flex justify-between">
//                             <span className="text-muted-foreground">
//                               Experience:
//                             </span>
//                             <span>
//                               {selectedUser.tutorProfile.experience} years
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 )}
//               </div>

//               {/* Action Buttons */}
//               <div className="flex justify-end gap-3 border-t pt-4">
//                 {selectedUser.role === "TUTOR" &&
//                   selectedUser.tutorProfile &&
//                   !selectedUser.tutorProfile.isApproved && (
//                     <Button
//                       variant="default"
//                       className="bg-green-600 hover:bg-green-700"
//                       onClick={() => {
//                         handleApproveTutor(selectedUser.tutorProfile!.id);
//                         setIsDetailsOpen(false);
//                       }}
//                     >
//                       <CheckCircle className="h-4 w-4 mr-2" />
//                       Approve Tutor
//                     </Button>
//                   )}
//                 <Button
//                   variant={selectedUser.isBanned ? "outline" : "destructive"}
//                   onClick={() => {
//                     handleBanUser(selectedUser.id, selectedUser.isBanned);
//                     setIsDetailsOpen(false);
//                   }}
//                 >
//                   {selectedUser.isBanned ? (
//                     <>
//                       <UserCheck className="h-4 w-4 mr-2" />
//                       Unban User
//                     </>
//                   ) : (
//                     <>
//                       <Ban className="h-4 w-4 mr-2" />
//                       Ban User
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
