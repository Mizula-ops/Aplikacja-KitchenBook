// app/+not-found.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ups… Strona nie istnieje!</Text>
      <Link href="/" style={styles.link}>Wróć do home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding:20 },
  title: { fontSize:24, marginBottom:12, textAlign:'center' },
  link:  { fontSize:18, color:'blue' },
});
