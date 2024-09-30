import { NextResponse } from 'next/server';
import { getMenuList } from '@/lib/db';

// 返回包含id，title，updated_at的json对象
export async function GET () {
  const result = await getMenuList();
  return NextResponse.json(result);
}