import React, {useState} from 'react';
import {View,Text,StyleSheet,TextInput} from 'react-native';

import {useMyContext} from '@/components/my_components/DataContext'



export default function Title() {
  
  const {title, setTitle} = useMyContext();
  return (
    
      <View style={styles.container}>
      
          <Text style={styles.formText}>Podaj nazwe nowego przepisu: </Text>
          <TextInput
                      multiline={true}
                      maxLength={30}
                      style={styles.input}
                      value={title}
                      onChangeText={setTitle}
                    />
        
      </View>
   
      
    )
}
const styles =StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  input:{
    borderWidth:2,
    borderColor: '#cfc3f6ff',
    borderRadius:5,
    width: '90%',
    alignSelf:'center',
    height:'15%',
    marginTop:5,
    padding:10,
  },
  formText:{
    fontSize: 16,
    fontWeight: 'bold',
    color:'#655599ff',
    marginTop: 50,
    marginLeft:'7%',
    width:'90%',
  
  },

})