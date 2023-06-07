import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const InfoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App criado por:</Text>
      <Text style={styles.members}>RM93739 - Jorge Camara</Text>
      <Text style={styles.members}>RM94377 - Filipe Santos</Text>
      <Text style={styles.members}>RM94036 - Vitor Graciano</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef5db'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#377a3f'
  },
  members: {
    color: '#377a3f',
    textAlign: 'center',
    fontSize: 18
  }
});

export default InfoScreen;
