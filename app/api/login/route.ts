import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

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

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

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

    // 3️⃣ Session automatically saved in cookies
    return NextResponse.json({ user, session: data.session }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
