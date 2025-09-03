// components/ErrorState.tsx
"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ErrorStateProps {
  message?: string;
  reset?: () => void;
}

export default function ErrorState({ message = "Something went wrong!", reset }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
      <AlertCircle className="w-12 h-12 text-red-500" />
      <h2 className="text-xl font-semibold text-gray-800">{message}</h2>
      <p className="text-sm text-gray-500">Please try again or go back.</p>

      <div className="flex gap-3">
        {reset && (
          <Button
            variant="default"
            onClick={() => {
              toast.info("Retrying...");
              reset();
            }}
          >
            Retry
          </Button>
        )}
        <Button
          variant="secondary"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}
