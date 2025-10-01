import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// GET: fetch current user profile
export async function GET() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user.id) // ✅ use FK, not PK
    .single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, user: data });
}

// PUT: update current user profile
export async function PUT(req: Request) {
  const supabase = await createClient();
  const body = await req.json();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("users")
    .update({
      name: body.name,
      email: body.email,
      gender: body.gender,
      phone: body.phone,
      bio: body.bio,
      location: body.location,
      avatar: body.avatar,
    })
    .eq("user_id", user.id) 
    .select()
    .single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, user: data });
}
