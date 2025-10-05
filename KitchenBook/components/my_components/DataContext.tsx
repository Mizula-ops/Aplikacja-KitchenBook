
import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { CameraCapturedPicture } from 'expo-camera';
import { upsertRecipe, getRecipe, deleteRecipe } from '@/app/storage/recipes';

export type GalleryImage = {
  uri: string;
  width?: number;
  height?: number;
  base64?: string;
};
export type Photo = CameraCapturedPicture | GalleryImage;


export interface IngredientItem { name: string; quality: number; }

export type MyContextType = {

  title: string; 
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  portions: number; 
  setPortions: React.Dispatch<React.SetStateAction<number>>;
  ingredients: IngredientItem[]; 
  setIngredients: React.Dispatch<React.SetStateAction<IngredientItem[]>>;
  addIngredient: (item: IngredientItem) => void; 
  clearIngredients: () => void;


  level: number; 
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  calory: number; 
  setCalory: React.Dispatch<React.SetStateAction<number>>;
  timeCook: number; 
  setTimeCook: React.Dispatch<React.SetStateAction<number>>;
  categories: string[]; 
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  toggleCategory: (id: string) => void; 
  clearCategories: () => void;


  notes: string; 
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  description: string; 
  setDescription: React.Dispatch<React.SetStateAction<string>>;

  tempPhoto: Photo | null;
  setTempPhoto: (p: Photo | null) => void;
  clearPhoto: () => void;


  clearAll: () => void;
  currentId: number | null;
  saveCurrentRecipe: () => Promise<void>;
  loadRecipeToContext: (id: number) => Promise<void>;
  deleteCurrentRecipe: () => Promise<void>;
};

const MyContext = createContext<MyContextType>({} as any);

export const MyProvider = ({ children }: { children: ReactNode }) => {

  const [title, setTitle] = useState('');
  const [portions, setPortions] = useState(1);
  const [ingredients, setIngredients] = useState<IngredientItem[]>([]);
  const addIngredient = (item: IngredientItem) => setIngredients(p => [...p, item]);
  const clearIngredients = () => setIngredients([]);

  const [level, setLevel] = useState(0);
  const [calory, setCalory] = useState(0);
  const [timeCook, setTimeCook] = useState(0);

  const [categories, setCategories] = useState<string[]>([]);
  const toggleCategory = (id: string) =>
    setCategories(p => (p.includes(id) ? p.filter(x => x !== id) : [...p, id]));
  const clearCategories = () => setCategories([]);

  const [notes, setNotes] = useState('');
  const [description, setDescription] = useState('');
  const [currentId, setCurrentId] = useState<number | null>(null);

  const [tempPhoto, setTempPhoto] = useState<Photo | null>(null);
  const clearPhoto = () => setTempPhoto(null);

 
  const getPhotoUri = (p: Photo | null): string | null => (p ? (p as any).uri ?? null : null);

  const clearAll = () => {
    setTitle('');
    setPortions(0);
    clearIngredients();
    setLevel(0);
    setCalory(0);
    setTimeCook(0);
    clearCategories();
    setNotes('');
    setDescription('');
    setCurrentId(null);
    clearPhoto();
  };

  const saveCurrentRecipe = async () => {
    const id = await upsertRecipe({
      id: currentId ?? undefined,
      title,
      portions,
      ingredients,
      level,
      calory,
      timeCook,
      categories,
      notes,
      description,
      photoUri: getPhotoUri(tempPhoto),
    });
    setCurrentId(id);
  };

  const loadRecipeToContext = async (id: number) => {
    const r = await getRecipe(id);
    if (!r) return;

    setCurrentId(r.id!);
    setTitle(r.title);
    setPortions(r.portions);
    setIngredients(r.ingredients);
    setLevel(r.level);
    setCalory(r.calory);
    setTimeCook(r.timeCook);
    setCategories(r.categories);
    setNotes(r.notes);
    setDescription(r.description);
    setTempPhoto(r.photoUri ? { uri: r.photoUri } : null);
  };

  const deleteCurrentRecipe = async () => {
    if (currentId) await deleteRecipe(currentId);
    setCurrentId(null);
    clearPhoto();
  };

  return (
    <MyContext.Provider
      value={{
        title, setTitle,
        portions, setPortions,
        ingredients, setIngredients, addIngredient, clearIngredients,
        level, setLevel,
        calory, setCalory,
        timeCook, setTimeCook,
        categories, setCategories, toggleCategory, clearCategories,
        notes, setNotes,
        description, setDescription,
        tempPhoto, setTempPhoto, clearPhoto,
        clearAll,
        currentId,
        saveCurrentRecipe,
        loadRecipeToContext,
        deleteCurrentRecipe,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
