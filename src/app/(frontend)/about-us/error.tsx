"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const AboutError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex h-[70vh] flex-col items-center justify-center text-center px-4">
      <h2 className="text-2xl font-semibold text-red-600">
        Something went wrong
      </h2>

      <p className="mt-2 text-gray-600">
        An unexpected error occurred while loading this page.
      </p>

      <Button onClick={reset} className="mt-5">
        Try again
      </Button>
    </section>
  );
};

export default AboutError;
