"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

async function submitSuggestion(message: string) {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from("suggestions")
    .insert([{ message }]);

  if (error) {
    throw new Error(error.message);
  }
}

function SuggestionInput() {
  const [suggestion, setSuggestion] = useState("");

  const mutation = useMutation({
    mutationFn: submitSuggestion,
    onSuccess: () => {
      toast.success("Thank you for your suggestion!");
      setSuggestion("");
    },
    onError: () => {
      toast.error("Failed to submit. Please try again.");
    },
  });

  const handleSubmit = () => {
    if (suggestion.trim() === "") {
      toast.error("Please enter a suggestion.");
      return;
    }
    mutation.mutate(suggestion);
  };

  return (
    <div className="flex flex-col items-start gap-3 w-full lg:w-auto">
      <p className="font-semibold">What feature would you love to have?</p>
      <div className="flex w-full sm:w-auto">
        <input
          type="text"
          placeholder="Kindly drop your suggestions"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          className="px-4 py-2 rounded-l-full w-full sm:w-96 text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={handleSubmit}
          disabled={mutation.status === "pending"}
          className="bg-orange-500 text-white px-4 rounded-r-full hover:bg-orange-600 flex items-center justify-center"
        >
          {mutation.status === "pending" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <ArrowRight className="w-5 h-5" />
          )}
        </button>
      </div>    
    </div>
  );
}

export default SuggestionInput;
