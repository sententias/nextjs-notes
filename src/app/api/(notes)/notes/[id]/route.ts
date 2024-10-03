import { NextRequest, NextResponse } from 'next/server';
import { deleteById, getById } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // 根据 ID 获取笔记
  const note = await getById(id, 'notes');

  // if (!note) {
  //   return NextResponse.json({ message: 'Note not found' }, { status: 404 }); // 如果未找到笔记，返回 404
  // }

  return NextResponse.json({ note: { ...note[0] } }, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // 删除笔记
  const deleted = await deleteById(id, 'notes');

  if (!deleted) {
    return NextResponse.json({ message: 'Note not found or could not be deleted' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Note deleted successfully' }, { status: 200 });
}
