
"use client";

import { useEffect } from "react";
import ErrorState from "@/components/ErrorState";
import { toast } from "sonner";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
    toast.error(error.message || "An unexpected error occurred");
  }, [error]);

  return <ErrorState message={error.message} reset={reset} />;
}
