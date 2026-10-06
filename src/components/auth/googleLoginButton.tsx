"use client";

import { authClient } from "@/lib/auth-client";
import { getRegistrationRedirect } from "@/lib/registration-redirect";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

export const GoogleLoginButton = () => {
  const [isPending, setIsPending] = useState(false);

  const handleGoogleLogin = async () => {
    setIsPending(true);
    const redirectPath = getRegistrationRedirect(window.location.search);
    await authClient.signIn.social({
      provider: "google",
      callbackURL:
        redirectPath === "/"
          ? "https://smartlease-frontend.vercel.app"
          : new URL(redirectPath, window.location.origin).toString(),
    });
    setIsPending(false);
  };

  return (
    <Button
      className="w-full cursor-pointer bg-btn-primary hover:bg-transparent text-btn-text hover:border-border-color"
      onClick={handleGoogleLogin}
      disabled={isPending}
    >
      {/* Google Icon */}
      <FaGoogle />
      {isPending ? "Redirecting..." : "Continue with Google"}
    </Button>
  );
};
