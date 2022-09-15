import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import React from 'react';
import { StyleSheet, Text, TextInput, Image, View, Button, Alert, FlatList } from 'react-native';

export default function App() {

const [keyword, setKeyword] = useState('');
const [meals, setMeals] = useState([]);

//Fetch API
const fetchMeals = () =>{
  fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i='+keyword)
  .then(response => response.json())
  .then(data => setMeals(data.meals))
  .catch(err => Alert.alert('Error', err))
};

  return (
    <View style={styles.container}>
      <FlatList
      data={meals}
      renderItem={({item}) =>
      <View style={{margin: 10}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.strMeal}</Text>
        <Image
        style={{width: 60, height: 60, marginLeft: 5}}
        source={{uri:item.strMealThumb}}
        />
      </View>
      }
      ItemSeparatorComponent={() => {
        return (
            <View style={{height: 1, backgroundColor: 'black'}}/>
        )
    }}
      />

      <TextInput
      style={{fontSize: 18}}
      placeholder='Ingredient'
      onChangeText={text => setKeyword(text)}

      />
      <Button title='Search' onPress={fetchMeals}></Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
