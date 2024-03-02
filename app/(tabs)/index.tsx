import { FlatList, Pressable, StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { observable } from '@legendapp/state';
import { observer } from "@legendapp/state/react";

import {
  configureObservablePersistence,
  persistObservable,
} from '@legendapp/state/persist';
import { ObservablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import Button from '@/components/Button';
import { FontAwesome } from '@expo/vector-icons';

type Ingredients = {
  id: number;
  name: string;
  amount: string;
}

configureObservablePersistence({
  // Use AsyncStorage in React Native
  pluginLocal: ObservablePersistAsyncStorage,
  localOptions: {
    asyncStorage: {
      // The AsyncStorage plugin needs to be given the implementation of AsyncStorage
      AsyncStorage,
    },
  },
})

const state = observable({
  ingredients: [
    { id: 1, name: 'Flour', amount: 600 },
    { id: 2, name: 'Water', amount: 395 },
    { id: 3, name: 'Starter', amount: 227 },
    { id: 4, name: 'Salt', amount: 18 },
  ]
});

persistObservable(state, {
  local: 'store', // Unique name
})

const TabOneScreen = observer(() => {
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<number | null>(null);

  const ingredients = state.ingredients.get();

  const addItem = () => {
    const newIngredient = {
      id: Math.random(),
      name,
      amount: Number(amount),
    };

    state.ingredients.set((currentIngredients) => [...currentIngredients, newIngredient]);

    setName('');
    setAmount(0);
  }

  const handleChangeTextToNumber = (i: string) => {
    setAmount(Number(i));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
      <View style={{ width: '100%', }}>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Name"
          returnKeyType='next' 
        />
        <TextInput
          style={styles.input}
          onChangeText={handleChangeTextToNumber}
          value={amount?.toString()}
          placeholder="Amount"
          keyboardType="numeric"
          returnKeyType='done' 
        />
      </View>
      <FlatList
        data={ingredients}
        // @ts-ignore
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable 
            style={{ flexDirection: 'row', gap: 10, marginVertical: 5 }}
            onPress={() => state.delete()}
          >
            <Text>
              {item.amount} {item.name}
            </Text>
            <FontAwesome name="trash-o" size={25} color={'white'} />
          </Pressable>
        )}
      />
      
      <Button text="Add Expense" onPress={addItem} />
    </View>
  );
})

export default TabOneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    width: '100%',
    margin: 10,
    borderWidth: 1,
    padding: 10,
    color: 'white',
    borderColor: 'white',
    borderRadius: 10,
  },
});
