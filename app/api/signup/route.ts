import { NextResponse } from 'next/server';
import { signUpSchema } from '@/lib/types';

export async function POST(request: Request): Promise<void> {
  const body: unknown = await request.json();

  // Compared to .parse, .safeParse will not throw error when it entercounter error.
  const result = signUpSchema.safeParse(body);

  return NextResponse.json({});
}
