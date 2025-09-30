import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // ✅ Get authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Logged in user:", user.id);

    // ✅ Fetch only orders belonging to the logged-in user
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id) // <--- this ensures security
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
