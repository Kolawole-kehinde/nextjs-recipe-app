import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    console.error("Supabase error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(data, { status: 200 });
}
