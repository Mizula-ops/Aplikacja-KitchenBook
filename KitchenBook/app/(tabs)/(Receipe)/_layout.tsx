// YourReceipeLayout.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Link, usePathname, Slot, useRouter } from 'expo-router';
import { useMyContext } from '@/components/my_components/DataContext';


export default function YourReceipeLayout() {
  const { clearAll,currentId, saveCurrentRecipe } = useMyContext();   // <-- teraz jesteśmy POD providerem
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: 'title',         label: 'Nazwa' },
    { name: 'integredients', label: 'Składniki' },
    { name: 'about',         label: 'Dane' },
    { name: 'execution',     label: 'Wykonanie' },
  ] as const;

  return (
    <View style={styles.container}>
      <View style={styles.optionContainer}>
        <TouchableOpacity onPress={() => { clearAll(); router.replace('/(tabs)'); }}>
          <Text style={styles.formText1}>Anuluj</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={async() => {
          await saveCurrentRecipe();
          router.replace('/(tabs)/explore'); }}>
          <Text style={styles.formText2}>Zachowaj</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navigationBar}>
        {tabs.map((tab) => {
          const isActive = pathname.endsWith(`/${tab.name}`);
          return (
            <Link key={tab.name} href={`./${tab.name}`} asChild>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 15,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: isActive ? '#8b77cbff' : 'transparent',
                  backgroundColor: isActive ? '#fff' : 'transparent',
                }}
              >
                <Text style={{ color: isActive ? '#655599ff' : '#fff', fontWeight: 'bold' }}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            </Link>
          );
        })}
      </View>

      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    marginTop: 70,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  formText1: { fontSize: 18, color: '#655599', marginHorizontal: 8, marginLeft: '8%' },
  formText2: { fontSize: 18, fontWeight: '500', color: '#655599', marginRight: '3%' },
  container: { flex: 1, backgroundColor: 'white' },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ae95ff',
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 1,
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
});
