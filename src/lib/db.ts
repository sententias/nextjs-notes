import { Pool, PoolClient } from 'pg';
import { DateTime } from 'luxon';

const pool = new Pool({
  user: 'notesadmin',
  host: 'localhost',
  database: 'notesdatabase',
  password: '',
  port: 5432
});

// 包装了一层 pool 连接
export async function withConnection(
  callback: (client: PoolClient) => Promise<any>
): Promise<any> {
  const client = await pool.connect();
  try {
    return await callback(client);
  } catch (error) {
    console.error('Database operation failed:', error);
    throw error;
  } finally {
    client.release();
  }
}

/**
 * @description 向数据库发送 SQL 语句，并获取执行结果
 * @param {string} sql SQL 语句
 */
export const query = async (sql: string) => {
  const result = await withConnection(async (client) => {
    const res = await client.query(sql);
    return res;
  });
  return result;
};

/**
 * @description 查询表中的全部结果
 * @param {string} table 查询表名
 */
export const getAll = async (table: string): Promise<NoteType[]> => {
  const result = await withConnection(async (client) => {
    const res = await client.query(`SELECT * FROM ${table};`);
    return res.rows;
  });
  return result;
};

/**
 * @description 获取侧边栏需要的数据
 */
export const getMenuList = async (): Promise<NoteType[]> => {
  const result = await withConnection(async (client) => {
    const res = await client.query(`SELECT id, title, updated_at FROM notes;`);
    return res.rows;
  });
  return result;
};

/**
 * @description 通过 ID 获取笔记详细信息
 * @param {string} id 笔记对应的 id
 * @param {string} table 查询表名
 */
export const getById = async (
  id: string,
  table: string
): Promise<NoteType[]> => {
  if (id === '') {
    return [];
  }
  const result = await withConnection(async (client) => {
    // 使用了参数化查询，确保安全性
    const res = await client.query(
      `SELECT * FROM ${table} WHERE ${table}.id = \$1;`,
      [id]
    );
    return res.rows;
  });
  return result;
};

export const insertOrUpdateNote = async (note: NoteType) => {
  // 格式化当前时间
  const currentTime = DateTime.local().toISO();

  // 检查 note 是否有 id，如果没有则获取下一个自增 id
  let idToUse = note.id;

  if (!idToUse) {
    // 查询下一个自增 id
    const getNextIdQuery =
      "SELECT nextval(pg_get_serial_sequence('notes', 'id')) AS next_id;";
    const nextIdResult = await withConnection(async (client) => {
      const res = await client.query(getNextIdQuery);
      return res.rows[0].next_id;
    });
    idToUse = nextIdResult;
  }

  // 插入或更新数据的 SQL 语句
  const query = `
    INSERT INTO notes (id, title, body, created_at, updated_at) 
    VALUES (\$1, \$2, \$3, \$4, \$5) 
    ON CONFLICT (id) 
    DO UPDATE SET 
      title = EXCLUDED.title,
      body = EXCLUDED.body,
      updated_at = EXCLUDED.updated_at
    RETURNING id;
  `;

  const values = [idToUse, note.title, note.body, currentTime, currentTime];

  const result = await withConnection(async (client) => {
    const res = await client.query(query, values);
    // 返回插入或更新记录的 id
    return res.rows[0].id;
  });

  return result;
};

export const deleteById = async (id: string, table: string):Promise<Boolean> => {
  const result = await withConnection(async (client) => {
    const res = await client.query(
      `DELETE FROM ${table} WHERE ${table}.id = \$1;`,
      [id]
    );
    // 返回是否删除成功
    return res.rowCount ? res.rowCount > 0 : false; 
  });

  return result;
};

export default pool;
