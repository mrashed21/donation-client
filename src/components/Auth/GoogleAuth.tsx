"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const GoogleAuth = () => {
  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
  };

  const session = authClient.getSession();
  console.log(session);

  return (
    <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
      Continue with Google
    </Button>
  );
};

export default GoogleAuth;
