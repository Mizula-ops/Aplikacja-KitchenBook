
import { queryAll, queryOne, execute } from './db';

export type IngredientItem = { name: string; quality: number };

export type Recipe = {
  id?: number;
  title: string;
  portions: number;
  ingredients: IngredientItem[];
  level: number;
  calory: number;
  timeCook: number;
  categories: string[];
  notes: string;
  description: string;
  photoUri?: string | null;
  createdAt?: number;
  updatedAt?: number;
};


export async function upsertRecipe(r: Recipe): Promise<number> {
  const now = Date.now();
  const ing = JSON.stringify(r.ingredients ?? []);
  const cats = JSON.stringify(r.categories ?? []);

  if (r.id != null) {
    await execute(
      `UPDATE recipes
       SET title=?, portions=?, ingredients=?, level=?, calory=?, timeCook=?,
           categories=?, notes=?, description=?, photoUri=?, updatedAt=?
       WHERE id=?`,
      [
        r.title ?? '',
        r.portions ?? 0,
        ing,
        r.level ?? 0,
        r.calory ?? 0,
        r.timeCook ?? 0,
        cats,
        r.notes ?? '',
        r.description ?? '',
        r.photoUri ?? null,
        now,
        r.id,
      ]
    );
    return r.id;
  } else {
    const res = await execute(
      `INSERT INTO recipes
       (title, portions, ingredients, level, calory, timeCook, categories, notes, description, photoUri, createdAt, updatedAt)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        r.title ?? '',
        r.portions ?? 0,
        ing,
        r.level ?? 0,
        r.calory ?? 0,
        r.timeCook ?? 0,
        cats,
        r.notes ?? '',
        r.description ?? '',
        r.photoUri ?? null,
        now,
        now,
      ]
    );
    if (res.lastInsertRowId == null) {
      throw new Error('INSERT failed: no lastInsertRowId');
    }
    return Number(res.lastInsertRowId);
  }
}

export async function getRecipe(id: number): Promise<Recipe | null> {
  const row = await queryOne<any>(`SELECT * FROM recipes WHERE id=?`, [id]);
  if (!row) return null;
  return hydrate(row);
}

export async function getAllRecipes(): Promise<Recipe[]> {
  const rows = await queryAll<any>(`SELECT * FROM recipes ORDER BY updatedAt DESC`, []);
  return rows.map(hydrate);
}

export async function deleteRecipe(id: number): Promise<void> {
  await execute(`DELETE FROM recipes WHERE id=?`, [id]);
}

export async function clearAllRecipes(): Promise<void> {
  await execute(`DELETE FROM recipes`, []);
}

function hydrate(row: any): Recipe {
  return {
    id: row.id,
    title: row.title,
    portions: row.portions,
    ingredients: safeParse<IngredientItem[]>(row.ingredients, []),
    level: row.level,
    calory: row.calory,
    timeCook: row.timeCook,
    categories: safeParse<string[]>(row.categories, []),
    notes: row.notes,
    description: row.description,
    photoUri: row.photoUri,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function safeParse<T>(s: string | null | undefined, fallback: T): T {
  try {
    return s ? (JSON.parse(s) as T) : fallback;
  } catch {
    return fallback;
  }
}
