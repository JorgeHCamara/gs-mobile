import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';
import { TextInputMask } from 'react-native-masked-text';

const RegisterScreen = () => {
  const [personType, setPersonType] = useState('');
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [sexo, setSexo] = useState('');
  const [filhos, setFilhos] = useState(null);
  const [rendaMedia, setRendaMedia] = useState(null);
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [rendaPerCapita, setRendaPerCapita] = useState(null);
  const [dtNascimento, setDtNascimento] = useState('');

  const dtContratacaoServico = new Date().toISOString().split('T')[0];

  const [emailError, setEmailError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  useEffect(() => {
    // regex for validating an email address
    const emailRegex = /\S+@\S+\.\S+/;
    // check that all inputs are filled out and valid
    const validEmail = emailRegex.test(email);

    if (emailTouched) { // only set the error message if the email input has been selected
      setEmailError(validEmail ? '' : 'Informe um e-mail válido.');
    }
  }, [email, telefone, dtNascimento]);

  const register = async () => {
    let url = `http://192.168.0.104:8080/${personType}`; // URL dinâmica baseada no tipo de pessoa
    let data;

    if (personType === 'pf') {
      data = {
        nome,
        endereco,
        telefone,
        email,
        cpf,
        dtNascimento: moment(dtNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        sexo,
        estadoCivil,
        filhos,
        rendaMedia,
        rendaPerCapita,
        dtContratacaoServico,
        senha,
      };
    } else if (personType === 'pj') {
      data = {
        nome,
        endereco,
        telefone,
        email,
        dtContratacaoServico,
        cnpj,
        senha
      };
    }

    try {
      const response = await axios.post(url, data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crie uma conta</Text>
      <RNPickerSelect
        placeholder={{
          label: 'Selecione o tipo de cadastro',
          value: null,
        }}
        onValueChange={(value) => setPersonType(value)}
        items={[
          { label: 'Pessoa Física', value: 'pf' },
          { label: 'Pessoa Jurídica', value: 'pj' },
        ]}
        style={{
          ...pickerSelectStyles,
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}
      />
      {personType === 'pf' && (
        <>
          <TextInput
            placeholder="Nome"
            style={styles.input}
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
          <TextInput
            placeholder="Endereço"
            style={styles.input}
            value={endereco}
            onChangeText={(text) => setEndereco(text)}
          />
          <TextInputMask
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
            placeholder="Telefone"
            style={styles.input}
            value={telefone}
            onChangeText={(text) => setTelefone(text)}
            maxLength={15}
          />
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            onFocus={() => setEmailTouched(true)}
          />
          <TextInputMask
            type={'cpf'}
            placeholder="CPF"
            style={styles.input}
            value={cpf}
            onChangeText={(text) => setCpf(text)}
          />
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY'
            }}
            placeholder="Data de Nascimento (DD/MM/YYYY)"
            style={styles.input}
            value={dtNascimento}
            onChangeText={(text) => setDtNascimento(text)}
          />
          <RNPickerSelect
            onValueChange={(value) => setSexo(value)}
            items={[
                { label: 'Masculino', value: 'MASCULINO' },
                { label: 'Feminino', value: 'FEMININO' },
            ]}
            placeholder={{ label: "Sexo", value: null }}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
            }}
          />
          <RNPickerSelect
            onValueChange={(value) => setEstadoCivil(value)}
            items={[
                { label: 'Solteiro', value: 'SOLTEIRO' },
                { label: 'Casado', value: 'CASADO' },
                { label: 'Divorciado', value: 'DIVORCIADO' },
                { label: 'Viuvo', value: 'VIUVO' },
                { label: 'União Estável', value: 'UNIAOESTAVEL' },
            ]}
            placeholder={{ label: "Estado Civil", value: null }}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
            }}
          />
          <TextInput
            placeholder="Filhos"
            style={styles.input}
            value={filhos}
            onChangeText={(text) => setFilhos(text)}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Renda Média"
            style={styles.input}
            value={rendaMedia}
            onChangeText={(text) => setRendaMedia(text)}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Renda per Capita"
            style={styles.input}
            value={rendaPerCapita}
            onChangeText={(text) => setRendaPerCapita(text)}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Senha"
            secureTextEntry
            style={styles.input}
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />
        </>
      )}
      {personType === 'pj' && (
        <>
          <TextInput
            placeholder="Nome"
            style={styles.input}
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
          <TextInput
            placeholder="Endereço"
            style={styles.input}
            value={endereco}
            onChangeText={(text) => setEndereco(text)}
          />
          <TextInputMask
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
            placeholder="Telefone"
            style={styles.input}
            value={telefone}
            onChangeText={(text) => setTelefone(text)}
            maxLength={15}
          />
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            onFocus={() => setEmailTouched(true)}
          />
          <TextInputMask
            type={'cnpj'}
            placeholder="CNPJ"
            style={styles.input}
            value={cnpj}
            onChangeText={(text) => setCnpj(text)}
          />
          <TextInput
            placeholder="Senha"
            secureTextEntry
            style={styles.input}
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />
        </>
      )}
      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <View style={{ height: 250 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 30,
    backgroundColor: '#eef5db',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
    marginTop: 30
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});


export default RegisterScreen;
