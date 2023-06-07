import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

const PlantScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plantas</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('ViewPlant')}>
        <Text style={styles.buttonText}>Visualizar suas plantas</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('AddPlant')}>
        <Text style={styles.buttonText}>Cadastrar uma nova planta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef5db', // um verde claro suave
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#377a3f', // um verde escuro
  },
  button: {
    backgroundColor: '#377a3f',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PlantScreen;
