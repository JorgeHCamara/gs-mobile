import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView } from 'react-native';
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tela de Cadastro</Text>
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
      <Button title="Cadastrar" onPress={register} />
      <View style={{ height: 250 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 16
  },
  error: {
    color: 'red',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'gray',
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 10,
    fontWeight: '500'
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 0.5,
    borderColor: 'purple',
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 10,
  },
});


export default RegisterScreen;
