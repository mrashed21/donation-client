"use client";

import { Button } from "@/components/ui/button";
import { AUTH_URL } from "@/utils/BaseUrl";

const GoogleAuth = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${AUTH_URL}/api/auth/sign-in/google`;
  };

  return (
    <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
      Continue with Google
    </Button>
  );
};

export default GoogleAuth;
