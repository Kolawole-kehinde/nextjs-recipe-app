import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function PATCH(req: Request, { params }: Params) {
  const { id } = params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .update({ order_status: "cancelled" })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
