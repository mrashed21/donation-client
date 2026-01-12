"use client";

import { AUTH_URL } from "@/utils/BaseUrl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const VerifyEmailPage = () => {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        toast.error("Invalid verification link");
        return;
      }

      try {
        const res = await fetch(
          `${AUTH_URL}/api/auth/verify-email?token=${token}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          toast.error("Verification failed or link expired");
          return;
        }

        toast.success("Email verified successfully. You can now log in.");
        setTimeout(() => router.push("/auth/login"), 2000);
      } catch {
        toast.error("Something went wrong");
      }
    };

    verify();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Verifying your email…
    </div>
  );
};

export default VerifyEmailPage;
