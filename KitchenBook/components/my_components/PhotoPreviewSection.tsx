import { Fontisto } from '@expo/vector-icons';
import { useMyContext } from '@/components/my_components/DataContext';
import React from 'react';
import { TouchableOpacity, SafeAreaView, Image, StyleSheet, View } from 'react-native';
import {useRouter} from 'expo-router'

 
type Props = {
  handleRetakePhoto: () => void;
};
const PhotoPreviewSection = ({ handleRetakePhoto }: Props) =>{
  const router = useRouter();
  const { tempPhoto: photo,saveCurrentRecipe } = useMyContext();
   if (!photo) return;
  return(
    <SafeAreaView style={styles.container}>
    <View style={styles.TopContainer} />
    <View style={styles.box}>
      <Image
        style={styles.image}
        source={{ uri:photo.uri}}
      />
    </View>

    <View style={styles.bottomContainer}>
      <TouchableOpacity 
      style={styles.buttonLeft} 
      onPress={handleRetakePhoto}
      >
        <Fontisto name="trash" size={28} color="white" />
      </TouchableOpacity>
      <TouchableOpacity 
      style={styles.buttonRight} 
      onPress={()=>router.back()}
      >
        <Fontisto name="check" size={28} color="white" />
      </TouchableOpacity>
    </View>
  </SafeAreaView>
  )
}
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  TopContainer: {
    height: '5%',
    width: '100%',
  },
  box: {
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 1,
    height: '85%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '80%',
    borderRadius: 15,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonLeft: {
    padding: 30,
  },
  buttonRight: {
    padding: 30,
  },
});

export default PhotoPreviewSection;
