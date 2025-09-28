import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  try {
    // ✅ Authenticate user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ Parse request body
    const body = await req.json();
    const { items, totalPrice, shippingInfo, paymentMethod } = body;

    // ✅ Validation
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Items are required" },
        { status: 400 }
      );
    }

    if (typeof totalPrice !== "number" || totalPrice <= 0) {
      return NextResponse.json(
        { success: false, message: "Total price is required" },
        { status: 400 }
      );
    }

    // ✅ Insert into orders table
    const { data, error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total_price: totalPrice, 
        shipping_info: shippingInfo,
        payment_method: paymentMethod,
        order_status: "pending",
      })
      .select("id")
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, orderId: data.id });
  } catch (err) {
    console.error("Checkout API Error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to place order" },
      { status: 500 }
    );
  }
}
