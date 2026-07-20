"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ComponentProps } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLogin } from "../hooks/useLogin";
import { useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "../schemas";
import Link from "next/link";
import { useGoogleLogin } from "../hooks/useGoogleLogin";
import { toast } from "sonner";
import { Loader2, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { DEMO_USERS } from "../utils/DEMO_USERS";

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
  const { mutate: loginMutate, isPending: isLoginPending } = useLogin();
  const { mutate: googleMutate, isPending: isGooglePending } = useGoogleLogin();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const email = watch("email");
  const password = watch("password");
  const isFormFilled = !!email && !!password;

  const fillDemo = (email: string, password: string) => {
    setValue("email", email);
    setValue("password", password);
    toast.success("✅ Demo account loaded", {
      description: `You are ready to login with ${email}`,
      duration: 3000,
    });
  };

  const onSubmit = (data: LoginFormValues) => {
    loginMutate(data);
  };

  const isPending = isLoginPending || isGooglePending;

  return (
    <div
      className={cn("flex flex-col gap-6 w-full max-w-md mx-auto", className)}
      {...props}
    >
      <Card className="border-0 shadow-xl dark:shadow-2xl shadow-gray-200/50 dark:shadow-black/30 overflow-hidden">
        {/* Header with gradient accent */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500" />
          <CardHeader className="pt-8 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="size-5 text-blue-500" />
              <CardTitle className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                Welcome
              </CardTitle>
            </div>
            <CardDescription className="text-sm text-muted-foreground">
              Login to your account
            </CardDescription>
          </CardHeader>
        </div>

        <CardContent className="space-y-6">
          {/* ─── Login Form ─── */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <Mail className="size-4 text-muted-foreground" />
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                disabled={isPending}
                className={cn(
                  "h-11 px-4 transition-all duration-200",
                  errors.email && "border-red-500 ring-red-500/20",
                )}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <Lock className="size-4 text-muted-foreground" />
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                disabled={isPending}
                className={cn(
                  "h-11 px-4 transition-all duration-200",
                  errors.password && "border-red-500 ring-red-500/20",
                )}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending || !isFormFilled}
              className="w-full h-11 font-medium transition-all duration-200 group"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>

            {/* Sign up link */}
            <p className="text-center text-sm text-muted-foreground mt-4">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-foreground font-medium hover:underline underline-offset-4"
              >
                Sign up
              </Link>
            </p>
          </form>

          {/* ─── Divider ─── */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-muted-foreground">
                Or use demo
              </span>
            </div>
          </div>

          {/* ─── Demo Accounts ─── */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2.5">
              {DEMO_USERS.map((user) => {
                const Icon = user.icon;
                const isActive =
                  email === user.email && password === user.password;

                return (
                  <Button
                    key={user.role}
                    type="button"
                    variant="outline"
                    disabled={isPending}
                    onClick={() => fillDemo(user.email, user.password)}
                    className={cn(
                      "h-auto flex flex-col items-center justify-center gap-1.5 p-3 transition-all duration-200 border-2",
                      user.border,
                      isActive
                        ? "border-foreground shadow-md"
                        : "border-transparent",
                      "hover:shadow-md hover:scale-[1.02] active:scale-[0.98] relative",
                    )}
                  >
                    <div className={cn("rounded-full p-2", user.bg)}>
                      <Icon className={cn("size-5", user.color)} />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium leading-tight">
                        {user.role}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate max-w-20">
                        {user.email.split("@")[0]}
                      </p>
                    </div>
                    {isActive && (
                      <div className="absolute -top-1 -right-1 size-3 rounded-full bg-green-500 ring-2 ring-background" />
                    )}
                  </Button>
                );
              })}
            </div>
            <p className="text-center text-[11px] text-muted-foreground">
              👆 Select a role — email and password will auto-fill
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
