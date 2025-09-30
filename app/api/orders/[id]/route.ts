import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

interface Params {
  params: { id: string };
}

// ✅ PATCH: Mark an order as cancelled
export async function PATCH(req: Request, { params }: Params) {
  try {
    const supabase = await createClient();

    // Get logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orderId = params.id;

    // ✅ Update order_status to "cancelled" only if it belongs to this user
    const { error } = await supabase
      .from("orders")
      .update({ order_status: "cancelled" })
      .eq("id", orderId)
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Order cancelled" });
  } catch (err: any) {
    console.error("Cancel Order Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
