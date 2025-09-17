import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request, {params}: {params {id: string}}){
    const supabase = createClient();

    const {error} = await supabase
    .from("orders")
    .update({order_status: "cancelled"})
    .eq("id", params.id);

     if (error) {
    return NextResponse.json({ error: "Failed to cancel order" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
   
}