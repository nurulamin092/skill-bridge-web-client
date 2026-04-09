# Backend Folder Structure

```bash
skill-bridge-web-client/
├── .env
├── .gitignore
├── package.json
├── README.md
├── next.config.js
├── tsconfig.json
├── components.json
├── tailwind.config.ts
├── postcss.config.mjs
│
├── public/
│ ├── images/
│ └── favicon.ico
│
└── src/
├── app/
│ ├── favicon.ico
│ ├── globals.css
│ ├── layout.tsx
│ ├── page.tsx
│ │
│ ├── (public)/
│ │ ├── layout.tsx
│ │ ├── page.tsx # Home page
│ │ ├── login/
│ │ │ └── page.tsx
│ │ ├── register/
│ │ │ └── page.tsx
│ │ ├── tutors/
│ │ │ ├── page.tsx # Tutors list
│ │ │ └── [id]/
│ │ │ └── page.tsx # Tutor details
│ │ └── unauthorized/
│ │ └── page.tsx
│ │
│ ├── (dashboard)/
│ │ ├── layout.tsx
│ │ │
│ │ ├── student/
│ │ │ ├── layout.tsx
│ │ │ ├── page.tsx # Dashboard
│ │ │ ├── upcoming/
│ │ │ │ └── page.tsx
│ │ │ ├── past/
│ │ │ │ └── page.tsx
│ │ │ ├── reviews/
│ │ │ │ ├── page.tsx
│ │ │ │ └── new/
│ │ │ │ └── page.tsx
│ │ │ ├── profile/
│ │ │ │ └── page.tsx
│ │ │ ├── settings/
│ │ │ │ └── page.tsx
│ │ │ └── bookings/
│ │ │ ├── new/
│ │ │ │ └── page.tsx
│ │ │ ├── [id]/
│ │ │ │ └── page.tsx
│ │ │ └── success/
│ │ │ └── page.tsx
│ │ │
│ │ ├── tutor/
│ │ │ ├── layout.tsx
│ │ │ ├── page.tsx # Dashboard
│ │ │ ├── sessions/
│ │ │ │ └── page.tsx
│ │ │ ├── availability/
│ │ │ │ └── page.tsx
│ │ │ ├── reviews/
│ │ │ │ └── page.tsx
│ │ │ ├── profile/
│ │ │ │ └── page.tsx
│ │ │ └── settings/
│ │ │ └── page.tsx
│ │ │
│ │ └── admin/
│ │ ├── layout.tsx
│ │ ├── page.tsx # Dashboard
│ │ ├── users/
│ │ │ └── page.tsx
│ │ ├── categories/
│ │ │ └── page.tsx
│ │ ├── bookings/
│ │ │ └── page.tsx
│ │ ├── analytics/
│ │ │ └── page.tsx
│ │ └── settings/
│ │ └── page.tsx
│
├── components/
│ ├── ui/ # shadcn/ui components
│ │ ├── button.tsx
│ │ ├── card.tsx
│ │ ├── input.tsx
│ │ ├── badge.tsx
│ │ ├── avatar.tsx
│ │ ├── table.tsx
│ │ ├── dialog.tsx
│ │ ├── alert-dialog.tsx
│ │ ├── select.tsx
│ │ ├── tabs.tsx
│ │ ├── skeleton.tsx
│ │ ├── sidebar.tsx
│ │ ├── calendar.tsx
│ │ ├── popover.tsx
│ │ ├── separator.tsx
│ │ ├── alert.tsx
│ │ ├── dropdown-menu.tsx
│ │ ├── navigation-menu.tsx
│ │ ├── sheet.tsx
│ │ └── ...
│ │
│ ├── common/ # Reusable common components
│ │ ├── layout/
│ │ │ ├── PageHeader.tsx
│ │ │ ├── SectionHeader.tsx
│ │ │ └── Container.tsx
│ │ ├── feedback/
│ │ │ ├── EmptyState.tsx
│ │ │ ├── ErrorState.tsx
│ │ │ ├── LoadingSkeleton.tsx
│ │ │ └── ConfirmDialog.tsx
│ │ ├── data/
│ │ │ ├── SearchFilter.tsx
│ │ │ └── DataTable.tsx
│ │ ├── cards/
│ │ │ ├── StatsCard.tsx
│ │ │ ├── InfoCard.tsx
│ │ │ └── ActionCard.tsx
│ │ └── forms/
│ │ ├── FormDialog.tsx
│ │ └── FormActions.tsx
│ │
│ ├── layout/
│ │ ├── Navbar.tsx
│ │ ├── ModeToggle.tsx
│ │ └── AppSidebar.tsx
│ │
│ └── home/
│ ├── HeroSection.tsx
│ ├── FeaturedTutors.tsx
│ ├── CategoriesSection.tsx
│ ├── HowItWorks.tsx
│ └── Testimonials.tsx
│
├── features/
│ ├── auth/
│ │ ├── types/
│ │ │ └── auth.types.ts
│ │ ├── schemas/
│ │ │ └── index.ts
│ │ ├── services/
│ │ │ ├── login.service.ts
│ │ │ ├── register.service.ts
│ │ │ ├── session.service.ts
│ │ │ └── google-login.service.ts
│ │ ├── hooks/
│ │ │ ├── useAuth.ts
│ │ │ ├── useLogin.ts
│ │ │ ├── useRegister.ts
│ │ │ └── useGoogleLogin.ts
│ │ ├── components/
│ │ │ ├── LoginForm.tsx
│ │ │ └── RegisterForm.tsx
│ │ └── context.tsx
│ │
│ ├── tutors/
│ │ ├── types/
│ │ │ └── tutor.types.ts
│ │ ├── schemas/
│ │ │ └── index.ts
│ │ ├── api/
│ │ │ └── tutor.service.ts
│ │ ├── services/
│ │ │ └── tutor-review.service.ts
│ │ ├── hooks/
│ │ │ ├── useTutor.ts
│ │ │ ├── useTutors.ts
│ │ │ ├── useTutorFilters.ts
│ │ │ ├── useTutorReviews.ts
│ │ │ ├── useTutorProfile.ts
│ │ │ ├── useCategories.ts
│ │ │ ├── useUpdateProfile.ts
│ │ │ └── useCreateProfile.ts
│ │ └── components/
│ │ ├── TutorCard.tsx
│ │ ├── TutorFilters/
│ │ │ ├── index.tsx
│ │ │ ├── FilterHeader.tsx
│ │ │ ├── SearchFilter.tsx
│ │ │ ├── CategoryFilter.tsx
│ │ │ ├── PriceFilter.tsx
│ │ │ └── RatingFilter.tsx
│ │ ├── TutorProfile/
│ │ │ ├── index.tsx
│ │ │ ├── ProfileHeader.tsx
│ │ │ ├── AboutTab.tsx
│ │ │ ├── AvailabilityTab.tsx
│ │ │ └── ReviewsTab.tsx
│ │ ├── TutorSidebar.tsx
│ │ ├── TutorDashboard/
│ │ │ ├── index.tsx
│ │ │ ├── StatsGrid.tsx
│ │ │ ├── ReviewsTab.tsx
│ │ │ ├── SessionsTab.tsx
│ │ │ └── AvailabilityTab.tsx
│ │ ├── TutorProfileForm.tsx
│ │ └── TutorSessions.tsx
│ │
│ ├── students/
│ │ ├── types/
│ │ │ └── student.types.ts
│ │ ├── services/
│ │ │ └── student.service.ts
│ │ ├── hooks/
│ │ │ └── useStudent.ts
│ │ └── components/
│ │ ├── StudentDashboard/
│ │ │ ├── index.tsx
│ │ │ ├── StatsGrid.tsx
│ │ │ ├── UpcomingPreview.tsx
│ │ │ ├── SessionsTabs.tsx
│ │ │ └── QuickActions.tsx
│ │ └── StudentSidebar.tsx
│ │
│ ├── admin/
│ │ ├── types/
│ │ │ └── admin.types.ts
│ │ ├── hooks/
│ │ │ ├── useAdminStats.ts
│ │ │ ├── useAdminUsers.ts
│ │ │ ├── useAdminCategories.ts
│ │ │ └── useAdminBookings.ts
│ │ └── components/
│ │ ├── AdminDashboard/
│ │ │ ├── index.tsx
│ │ │ ├── DashboardHeader.tsx
│ │ │ ├── StatsGrid.tsx
│ │ │ ├── RecentActivity.tsx
│ │ │ └── CategoriesSummary.tsx
│ │ ├── AdminSidebar.tsx
│ │ ├── UserManagement/
│ │ │ ├── index.tsx
│ │ │ ├── UserTable.tsx
│ │ │ ├── UserTableRow.tsx
│ │ │ └── UserDetailsDialog.tsx
│ │ ├── CategoryManagement/
│ │ │ ├── index.tsx
│ │ │ ├── CategoryTable.tsx
│ │ │ ├── CategoryTableRow.tsx
│ │ │ ├── CreateCategoryDialog.tsx
│ │ │ └── EditCategoryDialog.tsx
│ │ ├── BookingManagement/
│ │ │ ├── index.tsx
│ │ │ ├── BookingHeader.tsx
│ │ │ ├── BookingFilters.tsx
│ │ │ ├── BookingTable.tsx
│ │ │ ├── BookingTableRow.tsx
│ │ │ └── BookingDetailsDialog.tsx
│ │ └── common/
│ │ ├── RefreshButton.tsx
│ │ ├── RoleBadge.tsx
│ │ └── StatusBadge.tsx
│ │
│ ├── bookings/
│ │ ├── types/
│ │ │ └── booking.types.ts
│ │ ├── schemas/
│ │ │ └── index.ts
│ │ ├── services/
│ │ │ └── booking.service.ts
│ │ ├── hooks/
│ │ │ ├── useBooking.ts
│ │ │ └── useCreateBooking.ts
│ │ └── components/
│ │ ├── BookingList.tsx
│ │ ├── BookingModal.tsx
│ │ └── BookingDetails.tsx
│ │
│ ├── reviews/
│ │ ├── types/
│ │ │ └── review.types.ts
│ │ ├── schemas/
│ │ │ └── index.ts
│ │ ├── services/
│ │ │ └── review.service.ts
│ │ ├── hooks/
│ │ │ ├── useCreateReview.ts
│ │ │ └── useReviews.ts
│ │ └── components/
│ │ ├── ReviewForm.tsx
│ │ ├── ReviewCard.tsx
│ │ └── MyReviewsList.tsx
│ │
│ ├── availability/
│ │ ├── types/
│ │ │ └── availability.types.ts
│ │ ├── hooks/
│ │ │ └── useAvailability.ts
│ │ └── components/
│ │ └── AvailabilityManagement.tsx
│ │
│ └── categories/
│ ├── types/
│ │ └── category.types.ts
│ ├── api/
│ │ └── category.service.ts
│ └── hooks/
│ └── useCategories.ts
│
├── lib/
│ ├── utils.ts
│ ├── api.ts
│ ├── auth.ts
│ ├── auth-client.ts
│ ├── auth-server.ts
│ └── prisma.ts (if needed)
│
├── providers/
│ ├── ThemeProvider.tsx
│ └── QueryProvider.tsx
│
├── hooks/
│ └── (custom global hooks)
│
├── types/
│ └── (global types)
│
├── config/
│ └── (config files)
│
├── constants/
│ └── index.ts
│
├── styles/
│ └── (additional styles)
│
├── middleware.ts (or proxy.ts)
└── env.ts

```
