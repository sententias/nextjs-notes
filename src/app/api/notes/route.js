import pool from "../../../../lib/db";
import { NextResponse } from 'next/server';

export async function GET () {
  // 获取连接
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM test;');
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    // 释放连接，但连接池没有结束
    client.release();
  }
}

