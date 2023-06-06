import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const ViewPlantScreen = () => {
  const [plantas, setPlantas] = useState([]);

  useEffect(() => {
    fetchPlantas();
  }, []);

  const fetchPlantas = async () => {
    try {
      const response = await axios.get(`http://192.168.0.104:8080/planta`);
      setPlantas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePlant = async (id) => {
    try {
      await axios.delete(`http://192.168.0.104:8080/planta/${id}`);
      fetchPlantas();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {plantas.map((planta, index) => (
        <View style={styles.card} key={index}>
          <View style={styles.headerContainer}>
          <Text style={styles.header}>{planta.tipo}</Text>
          <TouchableOpacity onPress={() => deletePlant(planta.id)}>
            <Icon name="trash" size={24} color="red" />
          </TouchableOpacity>
          </View>
          <Text style={styles.subheader}>Nome: {planta.nomeFruto}</Text>
          <Text style={styles.subheader}>Fenótipo: {planta.fenotipo}</Text>
          <Text style={styles.subheader}>Porção: {planta.tabelaNutricional.porcao}</Text>
          <Text style={styles.subheader}>Proteína: {planta.tabelaNutricional.proteina}</Text>
          <Text style={styles.subheader}>Carboidrato: {planta.tabelaNutricional.carboidrato}</Text>
          <Text style={styles.subheader}>Gordura Saturada: {planta.tabelaNutricional.gordura.saturada}</Text>
          <Text style={styles.subheader}>Gordura Monoinsaturada: {planta.tabelaNutricional.gordura.saturada}</Text>
          <Text style={styles.subheader}>Gordura Poliinsaturada: {planta.tabelaNutricional.gordura.saturada}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: '#f8f8f8',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      marginBottom: 10,
      borderColor: '#ddd',
      borderWidth: 1,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
    },
    subheader: {
      fontSize: 18,
      color: '#666',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

export default ViewPlantScreen;
