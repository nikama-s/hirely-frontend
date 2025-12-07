"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/schemas/auth";
import {
  FormInput,
  PasswordInput,
  AuthFormLayout,
  AuthSubmitButton,
  AuthFormLink
} from "@/components/auth";
import { useRegisterMutation } from "../api/auth";

export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: RegisterFormData) => {
    try {
      await registerMutation.mutateAsync(values);
      router.push("/applications");
      router.refresh();
    } catch (error) {
      // Error is handled by mutation
      console.error(error);
    }
  };

  return (
    <AuthFormLayout
      title="Create your account"
      description="Sign up to start organizing your job search in one place."
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
            autoComplete="new-password"
            error={errors.password}
            {...register("password")}
          />
        </div>

        {registerMutation.isError && (
          <div className="text-red-500 text-sm text-center">
            {registerMutation.error instanceof Error
              ? registerMutation.error.message
              : "Error signing up"}
          </div>
        )}

        <div className="space-y-3">
          <AuthSubmitButton
            isLoading={registerMutation.isPending}
            loadingText="Signing up..."
            defaultText="Sign up"
          />
          <AuthFormLink
            question="Already have an account?"
            linkText="Sign in"
            href="/login"
          />
        </div>
      </form>
    </AuthFormLayout>
  );
}
