import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

   
    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        order_status,
        created_at,
        total_price,
        order_items (
          id,
          quantity,
          product_id,
          products (
            id,
            name,
            price,
            image_url
          )
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (err: any) {
    console.error("Orders API Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
