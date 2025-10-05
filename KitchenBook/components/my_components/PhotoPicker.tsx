import * as ImagePicker from 'expo-image-picker';
import { usePhoto } from '@/components/my_components/PhotoContext';
import { TouchableOpacity, Text } from 'react-native';
import React, { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useMyContext } from '@/components/my_components/DataContext';
export function PhotoPickerButton() {
  
   const { setTempPhoto,saveCurrentRecipe } = useMyContext();

    useEffect(() => {setTempPhoto(null);}, []);
  const pickImage = async () => {
    
   
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Musisz dać pozwolenie, żeby wybrać zdjęcie!');
      return;
    }

  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: false,
    });

    if (result.canceled) {
      return;
    }
    const asset = result.assets[0];
     setTempPhoto({
      uri: asset.uri,
      width: asset.width,
      height: asset.height,
      base64:undefined,
    });
    
   
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <FontAwesome name="photo" size={30} color="#000"/>
    </TouchableOpacity>
  );
}
