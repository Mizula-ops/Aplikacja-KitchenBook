import React, {useState} from 'react';
import {View,Text,StyleSheet,TextInput,KeyboardAvoidingView,ScrollView,Platform} from 'react-native';
import { useMyContext } from '@/components/my_components/DataContext';

export default function Execution() {
  const { description, setDescription} = useMyContext();

  return (
      <View style={styles.container}>
          <ScrollView>
             <View style={styles.container}>
                <KeyboardAvoidingView
                      style={{flex:1}}
                      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
                    >
                    <Text style={styles.formText}>Wykonanie: </Text>
                    <TextInput
                                multiline={true}
                                scrollEnabled
                                style={styles.input}
                                maxLength={3000}
                                value={description}
                                onChangeText={setDescription}
                              />
                  </KeyboardAvoidingView>
                </View>


          </ScrollView>
         
  
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
    height:500,
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