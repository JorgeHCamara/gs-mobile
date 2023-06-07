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
    <Text style={styles.title}>iAqua</Text>
    {!showInputs && (
      <>
        <TouchableOpacity style={styles.button} onPress={() => choosePersonType('pf')}>
          <Text style={styles.buttonText}>Pessoa Física</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => choosePersonType('pj')}>
          <Text style={styles.buttonText}>Pessoa Jurídica</Text>
        </TouchableOpacity>
      </>
    )}
    {showInputs && (
      <>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            placeholder="Digite seu Email"
            style={styles.input}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Senha</Text>
          <TextInput
            placeholder="Digite sua Senha"
            secureTextEntry
            style={styles.input}
            onChangeText={setSenha}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </>
    )}
    <TouchableOpacity onPress={() => {/* logic */}}>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eef5db',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#333',
    marginBottom: 60,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
    fontWeight: '600',
  },
  input: {
    height: 45,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#228B22',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  linkText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
