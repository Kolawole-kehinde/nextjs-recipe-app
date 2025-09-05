import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const {name, email, gender, password} = body;

    if(!name || !email || !gender || !password) {
      return NextResponse.json(
        {error: "All fields are required"},
        {status: 400}
      ); 
      }
      const supabase = createClient();

      const {data: existingUser, error: fetchError} = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {name, email, gender}
        }
      });

 if (fetchError){
  return NextResponse.json(
    {error: fetchError.message},
    {status: 500}
  )
 }
}