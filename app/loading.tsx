
"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
   <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-orange-600 border-solid"></div>
      </div>
  );
}
