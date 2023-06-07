import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

const AddPlantScreen = () => {
  const [tipo, setTipo] = useState('');
  const [nomeFruto, setNomeFruto] = useState('');
  const [fenotipo, setFenotipo] = useState('');
  const [porcao, setPorcao] = useState(null);
  const [proteina, setProteina] = useState(null);
  const [carboidrato, setCarboidrato] = useState(null);
  const [saturada, setSaturada] = useState(null);
  const [monoinsaturada, setMonoinsaturada] = useState(null);
  const [poliinsaturada, setPoliinsaturada] = useState(null);
  const [kcal, setKcal] = useState(null);

  const addPlant = async () => {
    let url = `http://192.168.0.104:8080/planta`; // URL da API
    let data = {
      tipo,
      nomeFruto,
      fenotipo,
      tabelaNutricional: {
        porcao,
        proteina,
        carboidrato,
        gordura: {
          saturada,
          monoinsaturada,
          poliinsaturada,
        },
        kcal,
      },
    };

    try {
      const response = await axios.post(url, data);
      console.log("Cadastro realizado com sucesso.");
      navigation.navigate('Plantas');
    } catch (error) {
      console.log("Não foi possível adicionar essa planta. Revise os dados.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cadastrar uma nova planta</Text>
      
      <RNPickerSelect
        onValueChange={(value) => setTipo(value)}
        items={[
            { label: 'Fruta', value: 'FRUTA' },
            { label: 'Legume', value: 'LEGUME' },
            { label: 'Verdura', value: 'VERDURA' },
        ]}
        placeholder={{ label: "Tipo", value: null }}
        style={{
          inputIOS: styles.input, // iOS
          inputAndroid: styles.input, // Android
        }}
      />

      <TextInput
        placeholder="Nome do fruto"
        style={styles.input}
        value={nomeFruto}
        onChangeText={(text) => setNomeFruto(text)}
      />
      <TextInput
        placeholder="Fenotipo"
        style={styles.input}
        value={fenotipo}
        onChangeText={(text) => setFenotipo(text)}
      />
      <TextInput
        placeholder="Porção"
        style={styles.input}
        value={porcao}
        onChangeText={(text) => setPorcao(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Proteína"
        style={styles.input}
        value={proteina}
        onChangeText={(text) => setProteina(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Carboidrato"
        style={styles.input}
        value={carboidrato}
        onChangeText={(text) => setCarboidrato(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Gordura Saturada"
        style={styles.input}
        value={saturada}
        onChangeText={(text) => setSaturada(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Gordura Monoinsaturada"
        style={styles.input}
        value={monoinsaturada}
        onChangeText={(text) => setMonoinsaturada(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Gordura Poliinsaturada"
        style={styles.input}
        value={poliinsaturada}
        onChangeText={(text) => setPoliinsaturada(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Calorias (kcal)"
        style={styles.input}
        value={kcal}
        onChangeText={(text) => setKcal(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={addPlant} >
        <Text style={styles.buttonText}>Adicionar planta</Text>
      </TouchableOpacity>
      <View style={{ height: 200 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eef5db',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#377a3f',
  },
  input: {
    borderWidth: 1,
    borderColor: '#377a3f',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    paddingLeft: 15,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#377a3f',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddPlantScreen;
