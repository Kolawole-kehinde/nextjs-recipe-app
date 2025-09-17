import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request){
 const {searchParams} = new URL(req.url);
 const userId = searchParams.get("userId");
 
 if (!userId) {
    return NextResponse.json(
        {error: "user ID is required"},
        {status: 400}
    )
 }

 const  supabase = createClient();
 const {data, error} = await supabase
 .from("orders")
 .select("*")
 .eq("user_id", userId)
 .order("created_at", {ascending: false});

 if (error) {
   return NextResponse.json({error: "Error fetching orders"}, {status: 500})
 }
 return NextResponse.json(data || [])
}