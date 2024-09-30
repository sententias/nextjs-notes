import { NextRequest, NextResponse } from 'next/server';
import { getById } from '@/lib/db';
// import { NextApiRequest } from "next";

export async function POST(request: NextRequest, response: NextResponse) {}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const note = await getById(parseInt(id), 'notes');

  return NextResponse.json(note, { status: 200 });
}
