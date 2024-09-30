import { NextResponse } from 'next/server';
import { getById } from '@/lib/db.ts';

export async function GET (req, { params }) {
  // 获取请求中的 id 参数
  const { id } = params;
  const result = await getById(id, 'notes');
  return NextResponse.json(result);
}
