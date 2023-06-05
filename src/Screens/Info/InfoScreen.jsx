import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const InfoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App criado por:</Text>
      <Text>RM93739 - Jorge Camara</Text>
      <Text>RM94377 - Filipe Santos</Text>
      <Text>RM94036 - Vitor Graciano</Text>
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

export default InfoScreen;
