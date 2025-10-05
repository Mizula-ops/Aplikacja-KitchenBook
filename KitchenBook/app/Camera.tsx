import React, { useState,useEffect, useRef, useLayoutEffect } from 'react';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import {useMyContext} from '../components/my_components/DataContext';
import PhotoPreviewSection from '@/components/my_components/PhotoPreviewSection';
import { useIsFocused } from '@react-navigation/native';

export default function Camera() {
  const router = useRouter();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const {tempPhoto, setTempPhoto} = useMyContext();
  const cameraRef = useRef<CameraView | null>(null);
 

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  useEffect(() => {setTempPhoto(null);}, []);
  
 
   if (!isFocused) return null; 
  
   
  if (!permission) return null;
  if (!permission.granted) {
    return (
      <View >
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
  
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  const handleTakePhoto = async () => {
  if (!cameraRef.current) {
    console.warn('Brak referencji do kamery');
    return;
  }
  try {
    const takenPhoto = await cameraRef.current.takePictureAsync({
      quality: 1,
      base64: false,
    });
    
    setTempPhoto(takenPhoto);
  } catch (e) {
    console.error('Błąd przy takePictureAsync:', e);
  }


};


  const handleRetakePhoto = () => setTempPhoto(null);

  if (tempPhoto) {
    return (
      <PhotoPreviewSection
        handleRetakePhoto={handleRetakePhoto}
      />
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.TopContainer}></View>
      <View style={styles.box}>
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
        />
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.back()}
        >
          <Fontisto name="close-a" size={24} color="white" />
        </TouchableOpacity>
          <TouchableOpacity
            style={styles.takePhoto}
            onPress={handleTakePhoto}
          >
            <AntDesign name="camera" size={44} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={toggleCameraFacing}
          >
            <AntDesign name="retweet" size={28} color="white" />
          </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'black', 
    flex: 1,
  },
  TopContainer: {
        borderRadius: 15,
        padding: 1,
        height: '10%',      
        width: '100%',

    },
  box: {
        backgroundColor: '', 
        borderRadius: 15,
        padding: 1,
        height: '80%',
        width: '100%',
        justifyContent: 'center',
        alignItems: "center",
    },
  camera: {
        width: '100%',
        height: '80%',
        borderRadius: 15
    },
    bottomContainer: {
    position: 'absolute',
    bottom: 50,              
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',  
    alignItems: 'center',
    
  },
  takePhoto: {

    padding: 20,
    
  },
  button: {
    padding: 20,
  },
 
});
