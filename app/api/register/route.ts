import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, gender, password } = body;

    if (!name || !email || !gender || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const supabase = await createClient();

    console.log("SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "loaded" : "missing");
console.log("Supabase object:", supabase);


    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, gender },
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "User registered successfully", user: data },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
