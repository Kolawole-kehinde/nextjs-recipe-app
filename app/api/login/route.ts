import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const supabase = createClient();

  if(!email || !password){
     return new Response("Missing email or password", {status: 400})
  }
    const {data: user, error: loginError} = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (loginError) {
         return NextResponse.json({ loginError: loginError.message }, { status: 401 });
    }
    

    return NextResponse.json({ user }, { status: 200 });
}
