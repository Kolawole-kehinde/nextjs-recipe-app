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

    console.log("👤 Logged in user:", user);

  const { data, error } = await supabase
  .from("orders")
  .select(`
    id,
    created_at,
    order_status,
    order_items (
      id,
      quantity,
      product_id,
      product_name,
      product:fk_order_items_product (
        name,
        price,
        image_url
      )
    )
  `);

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (err: any) {
    console.error("❌ Orders API Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
