import { supabase } from '::/db';
import { type NextRequest, NextResponse } from 'next/server'

type Params = { email: string, password: string }
export async function POST(req: NextRequest) {
  const body: Params = await req.json()
  const { email, password } = body
  const result = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return NextResponse.json(result)
}
