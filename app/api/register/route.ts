import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, gender, password } = body;

    if (!name || !email || !gender || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const supabase = await createClient();

    // 🔑 Sign up user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, gender } },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const user = data.user;

    if (user) {
      // Insert into custom "users" table
      const { data: insertedUser, error: insertError } = await supabase
        .from("users")
        .insert([{ user_id: user.id, email, name, gender }])
        .select()
        .single();

      if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }

      return NextResponse.json(
        { message: "Signup successful", user: insertedUser },
        { status: 201 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
