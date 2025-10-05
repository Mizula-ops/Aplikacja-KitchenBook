import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import {PhotoProvider} from '../components/my_components/PhotoContext'
import {MyProvider} from '../components/my_components/DataContext'
import { initDb}  from '@/app/storage/db';
import { useEffect } from 'react';

export default function RootLayout() {
 useEffect(() => { initDb(); }, []);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <MyProvider>
        <PhotoProvider>
        <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </PhotoProvider>

      </MyProvider>
      
    </ThemeProvider>
  );
}
