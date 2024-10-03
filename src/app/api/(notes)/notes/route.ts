import { insertOrUpdateNote } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // 解析请求体
  const { title,body,id } = await request.json(); 


  const note = {
    // 如果传入id，则使用，如果没传入，则id属性不存在
    ...(id ? { id } : {}),
    title,
    body
  }
  console.log(note)
  // 插入或更新笔记，并获取 ID
  const newId = await insertOrUpdateNote(note);
  
  // 返回插入或更新结果
  return NextResponse.json({ newId }, { status: 201 }); 
}