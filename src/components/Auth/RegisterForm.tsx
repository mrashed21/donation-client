"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { AUTH_URL } from "@/utils/BaseUrl";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

/* ---------------- Password Schema ---------------- */

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Must contain at least one special character");

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: passwordSchema,
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const resendVerification = async (email: string) => {
  try {
    const res = await fetch(`${AUTH_URL}/send-verification-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await res.json();

    if (!res.ok) {
      toast.error(result?.message || "Failed to resend email");
      return;
    }

    toast.success("Verification email sent again. Please check your inbox.");
  } catch {
    toast.error("Something went wrong");
  }
};

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch("password", "");

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await fetch(`${AUTH_URL}/sign-up/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Registerd Success! Please verify your email to login");
      }
      if (!res.ok) {
        toast.error("Something went wrong! try again");
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* ---------------- Password Checks ---------------- */

  const checks = {
    length: passwordValue.length >= 8,
    upper: /[A-Z]/.test(passwordValue),
    lower: /[a-z]/.test(passwordValue),
    number: /[0-9]/.test(passwordValue),
    symbol: /[^A-Za-z0-9]/.test(passwordValue),
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <div className="space-y-1">
        <Label>Name</Label>
        <Input placeholder="John Doe" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="john@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <Label>Password</Label>

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-2.5 text-muted-foreground"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>

      <button
        type="button"
        onClick={() => resendVerification(watch("email"))}
        className="text-sm underline text-primary"
      >
        Resend verification email
      </button>
    </form>
  );
};

export default RegisterForm;
