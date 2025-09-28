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

// Ensure record exists in "users" table
const { data: existingUser } = await supabase
  .from("users")
  .select("*")
  .eq("user_id", user.id)
  .single();

return NextResponse.json(
  { message: "Login successful", user: existingUser }, 
  { status: 200 }
);

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
