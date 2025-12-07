"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import {
  FormInput,
  PasswordInput,
  AuthFormLayout,
  AuthSubmitButton,
  AuthFormLink
} from "@/components/auth";
import { useLoginMutation } from "../api/auth";

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(values);
      router.push("/applications");
      router.refresh();
    } catch (error) {
      // Error is handled by mutation
      console.error(error);
    }
  };

  return (
    <AuthFormLayout
      title="Welcome back"
      description="Sign in to continue tracking your job applications."
    >
      <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormInput
            id="email-address"
            type="email"
            label="Email address"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email}
            {...register("email")}
          />
          <PasswordInput
            id="password"
            label="Password"
            placeholder="••••••••"
            autoComplete="current-password"
            error={errors.password}
            {...register("password")}
          />
        </div>

        {loginMutation.isError && (
          <div className="text-red-500 text-sm text-center">
            {loginMutation.error instanceof Error
              ? loginMutation.error.message
              : "Error logging in"}
          </div>
        )}

        <div className="space-y-3">
          <AuthSubmitButton
            isLoading={loginMutation.isPending}
            loadingText="Signing in..."
            defaultText="Sign in"
          />
          <AuthFormLink
            question="Don't have an account?"
            linkText="Register"
            href="/register"
          />
        </div>
      </form>
    </AuthFormLayout>
  );
}
