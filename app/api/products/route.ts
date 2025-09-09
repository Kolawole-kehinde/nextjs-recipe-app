import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Supabase error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log("Fetched products from Supabase:", data);
  return NextResponse.json(data, { status: 200 });
}
