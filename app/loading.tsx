
"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <Loader2 className="w-20 h-20 animate-spin text-orange-500" />
    </div>
  );
}
