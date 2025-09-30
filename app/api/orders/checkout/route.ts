import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  try {
    // Authenticate user
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

    // Extract body params 
    const body = await req.json();
    const { items, totalPrice, paymentMethod, shippingInfo } = body;

    if (!items || !items.length || !totalPrice || !paymentMethod || !shippingInfo) {
      return NextResponse.json(
        { success: false, message: "Missing required fields", body },
        { status: 400 }
      );
    }

    // Insert order into Supabae
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: user.id,
          total_price: totalPrice,
          order_status: "In Progress",
          payment_method: paymentMethod,
          shipping_info: shippingInfo, 
        },
      ])
      .select()
      .single();

    if (orderError) {
      return NextResponse.json(
        { success: false, message: "Order creation failed", error: orderError.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Order placed successfully", order },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Checkout API Error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to place order",
        error: err.message || JSON.stringify(err),
      },
      { status: 500 }
    );
  }
}
