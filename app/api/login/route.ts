import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // 1️⃣ Sign in user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    const user = data.user;

    // 2️⃣ Ensure record exists in "users" table
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!existingUser) {
      await supabase.from("users").insert([
        {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || null,
          gender: user.user_metadata?.gender || null,
          created_at: new Date().toISOString(),
        },
      ]);
    }

    return NextResponse.json({ message: "Login successful", user }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
