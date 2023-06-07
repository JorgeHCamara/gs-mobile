import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, ActivityIndicator, TextInput } from 'react-native';
import { Card, Text } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        console.log(`Person Type: ${user.personType}`);
        console.log(`User ID: ${user.id}`);

        const response = await axios.get(`http://192.168.0.104:8080/${user.personType}/${user.id}`);
        setUserData(response.data);
        setEmail(response.data.email);
        setEndereco(response.data.endereco);
        setTelefone(response.data.telefone);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const saveChanges = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    try {
      await axios.put(`http://192.168.0.104:8080/${user.personType}`, {
        id: user.id,
        email: email,
        endereco: endereco,
        telefone: telefone,
      });
  
      // Após a atualização, faça uma nova solicitação GET para obter os dados atualizados
      const response = await axios.get(`http://192.168.0.104:8080/${user.personType}/${user.id}`);
      setUserData(response.data);
      setEmail(response.data.email);
      setEndereco(response.data.endereco);
      setTelefone(response.data.telefone);
  
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Olá, {userData.nome}!</Card.Title>
        <Card.Divider/>
        {editing ? (
          <>
            <TextInput value={email} onChangeText={setEmail} style={styles.input} />
            <TextInput value={endereco} onChangeText={setEndereco} style={styles.input} />
            <TextInput value={telefone} onChangeText={setTelefone} style={styles.input} />
            <Button title="Salvar Alterações" onPress={saveChanges} color="#00cc00" />
          </>
        ) : (
          <>
            <Text style={styles.cardText}>Email: {userData.email}</Text>
            <Text style={styles.cardText}>Endereço: {userData.endereco}</Text>
            <Text style={styles.cardText}>Telefone: {userData.telefone}</Text>
            <Button title="Editar Dados" onPress={() => setEditing(true)} color="#377a3f" />
          </>
        )}
      </Card>

      <Button title="Sair" onPress={logout} color="#ff3333" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#eef5db',
  },
  loading: {
    marginTop: '50%',
  },
  card: {
    borderRadius: 10,
    marginTop: 80
  },
  cardTitle: {
    fontSize: 24,
    color: '#2f4f4f',
  },
  cardText: {
    marginBottom: 20,
    fontSize: 18,
    color: '#2f4f4f',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default AccountScreen;
