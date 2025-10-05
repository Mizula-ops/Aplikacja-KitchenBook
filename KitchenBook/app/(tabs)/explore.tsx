import React, { useRef, useState,useEffect} from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';

import { PhotoPickerButton } from '@/components/my_components/PhotoPicker';
import { useMyContext } from '@/components/my_components/DataContext';
import { categoryOptions } from './(Receipe)/about';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const { width, height } = Dimensions.get('window');


const HEADER_MIN_HEIGHT = 250;
const HEADER_MAX_HEIGHT = 400;

export default function ExploreScreen() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  const {
    title,
    portions,
    ingredients,
    level,
    calory,
    timeCook,
    categories,
    notes,
    description,
    clearAll,
    tempPhoto: photo ,
    saveCurrentRecipe,
    deleteCurrentRecipe,
  } = useMyContext();


  const headerHeight = scrollY.interpolate({
    inputRange: [-HEADER_MAX_HEIGHT, 0],
    outputRange: [HEADER_MAX_HEIGHT * 1.5, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });


  const SHEET_HEIGHT = Math.round(height * 0.25);
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetAnim = useRef(new Animated.Value(0)).current; 

  const openSheet = () => {
    setSheetOpen(true);
    Animated.timing(sheetAnim, { toValue: 1, duration: 220, useNativeDriver: true }).start();
  };
  const closeSheet = () => {
    Animated.timing(sheetAnim, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => {
      setSheetOpen(false);
    });
  };
  const translateY = sheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [SHEET_HEIGHT, 0],
  });
useEffect(() => {
  if (photo) {
    (async () => {
      await saveCurrentRecipe(); // teraz tempPhoto jest już w kontekście
    })();
  }
}, [photo]);
  return (
    
    <View style={styles.container}>
     
      <View style={styles.editButtonsContainer}>
          <TouchableOpacity onPress={async() =>{
               await saveCurrentRecipe();
            clearAll();
            router.push('/(tabs)')
          }}>
            
            <FontAwesome6 name="angle-left" size={30} color="#000" />
          </TouchableOpacity>

         <View style={styles.rightButtons}>
            <TouchableOpacity onPress={() => router.push('/Camera')}>
              <FontAwesome name="camera" size={30} color="#000" />
            </TouchableOpacity>

            <PhotoPickerButton />

            <TouchableOpacity onPress={openSheet}>
              <FontAwesome name="ellipsis-h" size={30} color="#000" />
            </TouchableOpacity>
        </View>
      </View>

      <Animated.View style={[styles.photoContainer, { height: headerHeight }]}>
        {photo ? (
          <Image style={styles.image} source={{ uri: photo.uri }} />
        ) : (
          <Text>Brak zdjecia</Text>
        )}
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
      >
        <View style={styles.summaryContainer}>
          <Text style={styles.titleText}>{title}</Text>

          {ingredients.length > 0 ? <Text style={styles.centerLabel}>SKŁADNIKI</Text> : null}
          {portions > 0 ? <Text style={styles.label}>ILOŚĆ PORCJI: {portions}</Text> : null}

          {ingredients.length > 0 ? (
            <ScrollView style={styles.ingredientsList}>
              {ingredients.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <FontAwesome name="star" size={18} style={styles.starIcon} />
                  <Text style={styles.ingredientText}>
                    {item.name} - {item.quality > 0 ? item.quality : 'few'}
                  </Text>
                </View>
              ))}
            </ScrollView>
          ) : null}

          {level > 0 || calory > 0 || timeCook > 0 ? (
            <Text style={styles.centerLabel}>INFORMACJE</Text>
          ) : null}

          {level > 0 ? (
            <>
              <View style={styles.levelContainer}>
                <Text style={styles.label}>Poziom trudności:</Text>
                {Array.from({ length: 5 }, (_, i) => i + 1).map((l) => (
                  <View key={l} style={styles.fireContainer}>
                    <FontAwesome5
                      name="fire"
                      size={28}
                      color={l <= Number(level || 0) ? '#FF4500' : '#DDD'}
                    />
                  </View>
                ))}
              </View>
            </>
          ) : null}

          {timeCook > 0 ? (
            <View style={styles.dataView}>
              <FontAwesome5 name="clock" style={styles.iconForm} size={28} color="#987d04" />
              <Text style={styles.label}>Czas wykonania: {timeCook}</Text>
            </View>
          ) : null}

          {calory > 0 ? (
            <View style={styles.dataView}>
              <FontAwesome5 name="burn" style={styles.iconForm} size={28} color="#d34306" />
              <Text style={styles.label}>Kalorie: {calory}</Text>
            </View>
          ) : null}

          {categories.length > 0 ? (
            <>
              <Text style={styles.centerLabel}>KATEGORIE</Text>
              <View style={styles.categoriesContent}>
                {categories.map((id) => {
                  const opt = categoryOptions.find((o) => o.id === id);
                  if (!opt) return null;
                  const { Component, name, color } = opt;
                  return (
                    <View key={id} style={styles.categoryContainer}>
                      <Component name={name} size={32} color={color} />
                      <Text style={styles.categoryText}>{id}</Text>
                    </View>
                  );
                })}
              </View>
            </>
          ) : null}

          {notes.length > 0 ? (
            <>
              <Text style={styles.centerLabel}>NOTATKI</Text>
              <ScrollView style={styles.notesView} contentContainerStyle={{ paddingBottom: 24 }}>
                <Text style={styles.notesText}>{notes}</Text>
              </ScrollView>
            </>
          ) : null}

          {description.length > 1 ? (
            <>
              <Text style={styles.centerLabel}>WYKONANIE</Text>
              <ScrollView style={styles.notesView} contentContainerStyle={{ paddingBottom: 24 }}>
                <Text style={styles.notesText}>{description}</Text>
              </ScrollView>
            </>
          ) : null}
        </View>
      </Animated.ScrollView>

 
      <Modal visible={sheetOpen} transparent animationType="none" onRequestClose={closeSheet}>
        <Pressable style={styles.backdrop} onPress={closeSheet} />
        <Animated.View
          style={[styles.sheet, { height: Math.round(height * 0.25), transform: [{ translateY }] }]}
        >
          <View style={styles.sheetHandle} />

          <TouchableOpacity
            style={styles.sheetItem}
            onPress={() => {
              closeSheet();
              router.push('/(tabs)/(Receipe)/title',);
            }}
            activeOpacity={0.7}
          >
            <FontAwesome name="edit" size={22} color="#655599" style={styles.sheetIcon} />
            <Text style={styles.sheetText}>Edytuj</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.sheetItem} 
            onPress={async () => {
              await deleteCurrentRecipe();
              closeSheet();
              clearAll();
              router.push('/(tabs)',);
            }} 
            activeOpacity={0.7}>
            <FontAwesome6 name="trash-can" size={22} color="#d34306" style={styles.sheetIcon} />
            <Text style={[styles.sheetText, { color: '#d34306' }]}>Usuń</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    zIndex: 2,
     alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 60,
    width: '95%',
  },
  rightButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  scrollView: {
    zIndex: 3,
  },
  
  scrollContent: {
    paddingTop: HEADER_MIN_HEIGHT,
  },
  photoContainer: {
    position: 'absolute',
    width,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  summaryContainer: {
    marginTop: -100,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  titleText: {
    width: '100%',
    color: '#655599ff',
    fontSize: 32,
    paddingBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    marginTop: 10,
    marginLeft: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#655599ff',
    marginRight: 8,
  },
  centerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#655599ff',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#cfc3f6ff',
    width: '100%',
    textAlign: 'center',
    paddingBottom: 7,
  },
  ingredientsList: {
    marginTop: 10,
    alignSelf: 'center',
    maxHeight: 300,
    width: '100%',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#655599ff',
    paddingBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#655599ff',
    width: '93%',
    alignSelf: 'center',
    paddingBottom: 5,
  },
  starIcon: {
    marginLeft: 5,
    alignSelf: 'center',
    color: 'gold',
  },
  ingredientText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#655599ff',
    marginVertical: 4,
    marginLeft: 5,
  },
  levelContainer: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  fireContainer: {
    marginRight: 12,
    padding: 4,
    borderRadius: 4,
  },
  dataView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  iconForm: {
    marginRight: 7,
    marginTop: 5,
  },
  categoryContainer: {
    width: '45%',
    margin: 8,
    borderWidth: 2,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 4,
    borderColor: '#655599',
  },
  categoriesContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#655599',
    marginHorizontal: 8,
    alignSelf: 'center',
  },
  notesView: {
    marginTop: 10,
    alignSelf: 'center',
    maxHeight: 300,
    width: '100%',
    borderWidth: 2,
    borderRadius: 6,
    borderColor: '#655599ff',
    paddingBottom: 10,
    padding: 5,
  },
  notesText: {
    fontWeight: 'bold',
    lineHeight: 26,
    fontSize: 16,
    color: '#655599ff',
    marginVertical: 4,
    margin: 5,
    marginTop: 10,
  },

  // Bottom sheet
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 16,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 48,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#ccc',
    marginBottom: 8,
  },
  sheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  sheetIcon: {
    marginRight: 12,
  },
  sheetText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#655599',
  },
});
