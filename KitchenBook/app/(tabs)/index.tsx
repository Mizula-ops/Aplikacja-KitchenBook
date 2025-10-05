import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {  useFocusEffect } from 'expo-router';
import { getAllRecipes, type Recipe } from '@/app/storage/recipes';
import { RecipeWindow } from '@/components/my_components/recipeWindow';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useMyContext } from '@/components/my_components/DataContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RecipesListScreen() {

  const { clearAll } = useMyContext();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const rows = await getAllRecipes();
      setRecipes(rows);
    } finally {
      setLoading(false);
    }
  }, []);


  useFocusEffect(
    useCallback(() => {
      clearAll();
      load();
    }, [load])
  );

 
 const filtered = useMemo(() => {
  const q = query.trim().toLowerCase();

  const base = q
    ? recipes.filter(r => (r.title || '').toLowerCase().includes(q))
    : recipes;
  return [...base].sort((a, b) =>
    (a.title || '').localeCompare((b.title || ''), 'pl', {
      sensitivity: 'base',
      numeric: true,        
    })
  );
}, [recipes, query]);

  

  const renderItem = useCallback(
    ({ item }: { item: Recipe }) => (
      <RecipeWindow
        id={item.id!}
        title={item.title}
        photoUri={item.photoUri}
              
      />
    ),
    []                   
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.loadingText}>Ładowanie przepisów…</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchRow}>
        <Icon name="search" size={18} color="#655599" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Szukaj po tytule…"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Icon name="times-circle" size={18} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id ?? Math.random())}
        contentContainerStyle={{ padding: 12, paddingBottom: 24 }}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              {query ? 'Brak wyników wyszukiwania.' : 'Nie masz jeszcze żadnych przepisów.'}
            </Text>
          </View>
        }
        initialNumToRender={8}
        windowSize={10}
        removeClippedSubviews
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginTop: 8, color: '#666' },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#cfc3f6ff',
    backgroundColor: '#faf8ff',
  },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },
  empty: { alignItems: 'center', padding: 24 },
  emptyText: { color: '#777' },
});
