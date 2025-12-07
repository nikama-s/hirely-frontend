import { useMutation } from "@tanstack/react-query";
import { LoginFormData, RegisterFormData } from "@/schemas/auth";

const loginUser = async (data: LoginFormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Error logging in");
  }

  return res.json();
};

const registerUser = async (data: RegisterFormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Error signing up");
  }

  return res.json();
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: registerUser
  });
};
