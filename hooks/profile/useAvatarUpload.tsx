"use client";

import { useState } from "react";

export function useAvatarUpload() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return { preview, handleImageChange };
}
