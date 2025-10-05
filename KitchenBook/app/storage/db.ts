
import * as SQLite from 'expo-sqlite';


export const db = SQLite.openDatabaseSync('kitchenbook.db');

// Wygodne helpery na nowe API
export async function queryAll<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  return db.getAllAsync<T>(sql, params);
}

export async function queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
  return db.getFirstAsync<T>(sql, params);
}

export async function execute(sql: string, params: any[] = []): Promise<{ changes: number; lastInsertRowId: number | null }> {
  const res = await db.runAsync(sql, params); // { changes, lastInsertRowId }
  return { changes: res.changes, lastInsertRowId: res.lastInsertRowId ?? null };
}

// Jednorazowe utworzenie schematu
export async function initDb() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      portions INTEGER,
      ingredients TEXT,   -- JSON
      level INTEGER,
      calory INTEGER,
      timeCook INTEGER,
      categories TEXT,    -- JSON
      notes TEXT,
      description TEXT,
      photoUri TEXT,
      createdAt INTEGER,
      updatedAt INTEGER
    );
  `);
}
