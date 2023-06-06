import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [personType, setPersonType] = useState('');
  const [showInputs, setShowInputs] = useState(false);

  const choosePersonType = (type) => {
    setPersonType(type);
    setShowInputs(true);
  };

  const login = async () => {
    try {
      const response = await axios.post(`http://192.168.0.104:8080/${personType}/login`, {
        email: email,
        senha: senha,
      });

      const userWithPersonType = {
        ...response.data,
        personType: personType,
      }

      await AsyncStorage.setItem('user', JSON.stringify(userWithPersonType));
      await AsyncStorage.setItem('userId', response.data.id.toString());

      // se o login for bem-sucedido, navegue para a tela inicial
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      // se ocorrer um erro na solicitação, exiba um alerta
      if (error.response.status === 401) {
        Alert.alert("Erro", "E-mail e/ou senha inválidos.");
      } else {
        Alert.alert("Erro", "Não foi possível realizar o login. Por favor, tente novamente mais tarde.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Título do Projeto</Text>
      {!showInputs && (
        <>
          <Button title="Pessoa Física" onPress={() => choosePersonType('pf')} />
          <Button title="Pessoa Jurídica" onPress={() => choosePersonType('pj')} />
        </>
      )}
      {showInputs && (
        <>
          <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} />
          <TextInput placeholder="Senha" secureTextEntry style={styles.input} onChangeText={setSenha} />
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={{ color: '#FFFFFF' }}>Entrar</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity onPress={() => {/* Aqui você pode colocar a lógica de recuperação de senha */}}>
        <Text style={styles.linkText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Criar uma conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5', // changed background color
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2F4F4F', // changed color
    textAlign: 'center', // added text align
  },
  input: {
    height: 50,
    borderColor: '#D3D3D3', // changed border color
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 15,
    borderRadius: 5, // added border radius
  },
  linkText: {
    textAlign: 'center',
    color: '#228B22', // changed color
    marginTop: 15,
    textDecorationLine: 'underline', // added underline
  },
  button: {
    backgroundColor: '#008080', // added button color
    color: '#FFFFFF', // added text color
    padding: 10, // added padding
    borderRadius: 5, // added border radius
    textAlign: 'center', // added text align
    marginBottom: 15, // added margin bottom
    fontSize: 16, // added font size
  },
});

export default LoginScreen;
