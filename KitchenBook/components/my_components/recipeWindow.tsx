import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useMyContext } from '@/components/my_components/DataContext';
import {useRouter } from 'expo-router';
type Props = {
  id: number;
  title: string;
  photoUri?: string | null;
};

export const RecipeWindow: React.FC<Props> = ({ id, title, photoUri}) => {
    const router= useRouter();
    const {loadRecipeToContext} =useMyContext();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={async () => {
        await loadRecipeToContext(id);
        router.replace('/(tabs)/explore');
      }
    }
    >
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.photo} />
      ) : (
        <View style={[styles.photo, styles.photoPlaceholder]}>
          <Text style={styles.placeholderText}>Brak zdjęcia</Text>
        </View>
      )}

      <Text numberOfLines={2} style={styles.title}>
        {title || 'Bez nazwy'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 12,
    marginVertical: 8,
  },
  photo: {
    width: '100%',
    height: 170,
    borderRadius: 8,
  },
  photoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
  },
  placeholderText: {
    color: '#999',
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
});
