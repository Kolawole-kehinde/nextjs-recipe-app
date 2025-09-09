import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, gender, password } = body;

    if (!name || !email || !gender || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // 1️⃣ Create user in Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, gender },
      },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // 2️⃣ Insert into your "users" table 
    if (data?.user) {
      const { error: insertError } = await supabase
        .from("users")
        .insert([
          {
            user_id: data.user.id, // 🔑 auth user id goes here
            name,
            email,
            gender,
          },
        ]);

      if (insertError) {
        return NextResponse.json(
          { error: insertError.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { message: "User registered successfully", user: data.user },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
