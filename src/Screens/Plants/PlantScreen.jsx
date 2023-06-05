import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const PlantScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plantas</Text>
      <Button 
        title="Visualizar suas plantas" 
        onPress={() => navigation.navigate('ViewPlant')} />
      <Button 
        title="Cadastrar uma nova planta" 
        onPress={() => navigation.navigate('AddPlant')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default PlantScreen;
