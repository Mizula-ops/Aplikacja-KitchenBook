import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {useMyContext} from '@/components/my_components/DataContext'



export default function Integredients() {
  const {portions, setPortions, ingredients, addIngredient}=useMyContext();
  const [currentName, setCurrentName] = useState<string>('');
  const [currentQty, setCurrentQty] = useState<number>(0);

  const inc_portions = () => setPortions(p => p + 1);
  const dec_portions = () => setPortions(p => Math.max(0, p - 1));

  const inc_qty = () => setCurrentQty(q => q + 1);
  const dec_qty = () => setCurrentQty(q => Math.max(0, q - 1));

  const handleAddIngredient = () => {
    if (!currentName.trim()) return;
    addIngredient({ name: currentName.trim(), quality: currentQty },);
    setCurrentName('');
    setCurrentQty(0);
  };

  return (
    <View style={styles.container}>
      {/* Sekcja porcji */}
      <Text style={styles.formText}>Porcje:</Text>
      <View style={styles.numberView}>
        <View style={styles.portionContainer}>
            <Text style={styles.label}>Podaj ilość porcji:</Text>
        <TextInput
          style={styles.numericInput}
          value={portions ? String(portions) : ''}
          onChangeText={text => {
            const n = parseInt(text, 10);
            setPortions(isNaN(n) ? 0 : Math.max(1, n));
          }}
          keyboardType="numeric"
          maxLength={3}
        />
      
          <TouchableOpacity onPress={inc_portions}>
            <Text style={styles.incButton}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={dec_portions}>
            <Text style={styles.decButton}>-</Text>
          </TouchableOpacity>
        </View>


   
        
      </View>

      {/* Sekcja składników */}
      <Text style={styles.formText}>Składniki:</Text>
      <View style={styles.ingredientsView}>
        <View style={styles.newIngredient}>
          <Text style={styles.label}>Nazwa:</Text>
          <TextInput
            placeholder="Nazwa składnika"
            style={styles.ingredientNameInput}
            value={currentName}
            onChangeText={setCurrentName}
            maxLength={30}
          />
          <Text style={styles.label}>Ilość:</Text>
          <TextInput
            placeholder="few"
            placeholderTextColor={'black'}
            style={styles.ingredientQtyInput}
            value={currentQty ? String(currentQty) : ''}
            onChangeText={text => {
              const n = parseInt(text, 10);
              setCurrentQty(isNaN(n) ? 0 : Math.max(0, n));
            }}
            keyboardType="numeric"
            maxLength={4}
          />
          <TouchableOpacity onPress={inc_qty}>
            <Text style={styles.incButton}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={dec_qty}>
            <Text style={styles.decButton}>-</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleAddIngredient} style={styles.addButton}>
          <Text style={styles.addButtonText}>Dodaj</Text>
        </TouchableOpacity>
      </View>

      {/* Lista dodanych składników */}
      <FlatList
        style={styles.flatList}
        data={ingredients}
        keyExtractor={(_, idx) => String(idx)}
        renderItem={({ item }) => (
            <View style={styles.itemRow}>
                <Icon name="star" size={16} style={styles.starIcon} />
                <Text style={styles.itemText}>
                    {item.name} : {item.quality ? item.quality :'few'}
                </Text>
            </View>
          
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginBottom:10,
  },
  // PORCJE
  numberView: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#cfc3f6ff',
    
  },
  portionContainer: {
    alignSelf:'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cfc3f6ff',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#655599ff',
    padding: 8,
    width:'90%',
    marginBottom: 20,
  },

  numericInput: {
    width:'12%',
    borderWidth: 2,
    borderColor: '#655599ff',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    height: 31,
    marginRight: 12,
    backgroundColor: 'white',
    textAlign:'center'
  },
  
  incButton: {
    fontWeight: 'bold',
    color: '#655599ff',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#655599ff',
    borderRadius: 30,
    paddingHorizontal: 6,
    paddingVertical: 2,
    margin: 2,
    textAlign: 'center',
  },
  decButton: {
    fontWeight: 'bold',
    color: '#655599ff',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#655599ff',
    borderRadius: 30,
    paddingHorizontal: 7,
    paddingVertical: 2,
    margin: 2,
    textAlign: 'center',
  },


  // INGREDIENTS
  formText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#655599ff',
    marginTop: 30,
    alignSelf:'center',
    textAlign:'center',
    width: '90%',
  },
  ingredientsView: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#cfc3f6ff',
  },
  newIngredient: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cfc3f6ff',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#655599ff',
    padding: 8,
  },
  label: {
    marginLeft:1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#655599ff',
    marginRight: 8,
  },
  ingredientNameInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#655599ff',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    height: 31,
    marginRight: 12,
    backgroundColor: 'white',
  },
  ingredientQtyInput: {
    width: 40,
    borderWidth: 2,
    padding: 2,
    fontSize: 16,
    height: 33,
    marginRight: 8,
    backgroundColor: 'white',
    borderColor: '#655599ff',
    borderRadius: 5,
    textAlign: 'center',
    alignSelf: 'center',
    
  },
  addButton: {
    marginTop: 20,
    marginBottom:20,
    alignSelf: 'center',
    backgroundColor: '#655599ff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  //FLATLIST
  flatList: {
    marginTop:10,
    alignSelf: "center",
    backgroundColor:'#cfc3f6ff',
    width:'90%',
    borderWidth: 1,
    borderRadius: 6,
     borderColor: '#655599ff',
     
  },
  itemRow: {
    flexDirection: 'row',
    marginTop:10,
    borderBottomWidth: 1,
    borderBottomColor: '#655599ff',
    width:'93%',
    alignSelf:'center'
  },
  starIcon:{
    marginLeft:5,
    alignSelf:'center',
     color: 'yellow',
  },
  itemText: {
    fontWeight:'bold',
    fontSize: 16,
    color: '#655599ff',
    marginVertical: 4,
    marginLeft:5,
    
  },
});
