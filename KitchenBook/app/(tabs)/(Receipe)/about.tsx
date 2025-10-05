import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { useMyContext } from '@/components/my_components/DataContext';

export type CategoryOption = {
  id: string;
  Component: React.ComponentType<{
    name: string;
    size: number;
    color: string;
    style?: any;
  }>;
  name: string;
  color: string;
};

export const categoryOptions: CategoryOption[] = [
  { id: 'Napój',     Component: Icon,         name: 'glass',           color: 'black'   },
  { id: 'Śniadanie', Component: FontAwesome5, name: 'egg',             color: '#feefbc' },
  { id: 'Obiad',     Component: FontAwesome5, name: 'drumstick-bite',  color: '#906a02' },
  { id: 'Zupa',      Component: FontAwesome5, name: 'mortar-pestle',   color: 'brown'   },
  { id: 'Słodycz',   Component: FontAwesome5, name: 'ice-cream',        color: '#df08c2' },
  { id: 'Fast-Food', Component: FontAwesome5, name: 'hamburger',        color: '#DEB887' },
  { id: 'Wegańskie', Component: FontAwesome5, name: 'seedling',         color: 'green'   },
  { id: 'Na zimno',  Component: FontAwesome5, name: 'temperature-low',  color: '#089bdf' },
  { id: 'Na ciepło', Component: FontAwesome5, name: 'thermometer-full', color: '#df3a08' },
  { id: 'Przekąska', Component: FontAwesome6, name: 'thermometer',      color: '#df5308' },
  { id: 'Lunch',     Component: FontAwesome6, name: 'toolbox',          color: '#f2aa0dff' },
];

export default function About() {
  const {
    level, setLevel,
    calory, setCalory,
    timeCook, setTimeCook,
    categories, toggleCategory,
    notes,setNotes
  } = useMyContext();

 


  return (
    <ScrollView style={styles.container}>
      {/* Poziom trudności */}
      <View style={styles.dataView}>
        <Text style={styles.label}>Poziom Trudności:</Text>
        <View style={styles.levelContainer}>
          {Array.from({ length: 5 }, (_, i) => i + 1).map(l => (
            <TouchableOpacity
              key={l}
              onPress={() => setLevel(l)}
              activeOpacity={0.7}
              style={[
                styles.levelButton,
                level === l && styles.levelButtonActive
              ]}
            >
              <FontAwesome5
                name="fire"
                size={28}
                color={l <= level ? '#FF4500' : '#DDD'}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Czas wykonania */}
      <View style={styles.dataView}>
        <FontAwesome5 name="clock" style={styles.iconForm} size={28} color="#987d04" />
        <Text style={styles.label}>Czas wykonania:</Text>
        <TextInput
          style={styles.numericInput}
          value={timeCook ? String(timeCook) : ''}
          maxLength={3}
          onChangeText={text => {
            const n = parseInt(text, 10);
            setTimeCook(isNaN(n) ? 0 : n);
          }}
          keyboardType="numeric"
          placeholder="0"
        />
        <Text style={styles.label}>minut(y)</Text>
      </View>

      {/* Kalorie */}
      <View style={styles.dataView}>
        <FontAwesome5 style={styles.iconForm} name="burn" size={28} color="#d34306" />
        <Text style={styles.label}>Kalorie:</Text>
        <TextInput
          style={styles.numericInput}
          value={calory ? String(calory) : ''}
          onChangeText={text => {
            const n = parseInt(text, 10);
            setCalory(isNaN(n) ? 0 : n);
          }}
          keyboardType="numeric"
          placeholder="0"
          maxLength={6}
        />
        <Text style={styles.label}>kcal</Text>
      </View>

      {/* Kategorie */}
      <Text style={styles.labelCategory}>Wybierz Kategorie:</Text>
      <View style={styles.categoriesContent}>
        {categoryOptions.map(({ id, Component, name, color }) => {
          const isSelected = categories.includes(id);
          return (
            <TouchableOpacity
              key={id}
              onPress={() => toggleCategory(id)}
              activeOpacity={0.7}
              style={[
                styles.catButton,
                isSelected && styles.catButtonSelected
              ]}
            >
              <Component
                name={name}
                size={32}
                color={color}
                style={isSelected ? styles.iconSelected : undefined}
              />
              <Text style={styles.categoryText}>{id}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Notatki */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <Text style={styles.labelCategory}>Notatki:</Text>
        <TextInput
          multiline
          scrollEnabled
          style={styles.notesInput}
          value={notes}
          onChangeText={setNotes}
          maxLength={490}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  dataView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#655599',
    marginHorizontal: 8,
  },
  iconForm: {
    marginLeft: 7,
  },
  levelContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  levelButton: {
    marginRight: 12,
    padding: 4,
    marginTop: -9,
    borderRadius: 4,
  },
  levelButtonActive: {
    backgroundColor: 'rgba(255,69,0,0.2)',
  },
  numericInput: {
    borderWidth: 2,
    borderColor: '#655599',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
    width: 80,
    textAlign: 'center',
  },
  labelCategory: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#655599',
    marginHorizontal: 8,
    alignSelf: 'center',
  },
  categoriesContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  catButton: {
    width: '45%',
    margin: 8,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 4,
  },
  catButtonSelected: {
    backgroundColor: '#65559920',
    borderColor: '#655599',
  },
  iconSelected: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#655599',
    alignSelf: 'center',
  },
  notesInput: {
    padding:10,
    marginTop: 10,
    width: '90%',
    height: 200,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#cfc3f6ff',
    alignSelf: 'center',
    marginBottom: 100,
  },
});
