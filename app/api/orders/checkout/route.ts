import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  try {
    // ✅ Authenticate
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // ✅ Extract body
    const body = await req.json();
    const { items, totalPrice, paymentMethod, shippingInfo } = body;

    if (!items?.length || !totalPrice || !paymentMethod || !shippingInfo) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    // ✅ Step 1: Create the order
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

    // ✅ Step 2: Map items → order_items rows
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      quantity: item.quantity,
      price: item.price,
      total_price: item.price * item.quantity,
    }));

    // ✅ Step 3: Insert into order_items
    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

    if (itemsError) {
      return NextResponse.json(
        { success: false, message: "Failed to insert order items", error: itemsError.message },
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
      { success: false, message: "Failed to place order", error: err.message || JSON.stringify(err) },
      { status: 500 }
    );
  }
}
