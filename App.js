import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, KeyboardAvoidingView, SafeAreaView, TouchableOpacity, Platform } from 'react-native';

export default function App() {
  const [numeroSecreto, setNumeroSecreto] = useState(gerarNumeroAleatorio());
  const [palpite, setPalpite] = useState('');
  const [mensagem, setMensagem] = useState('');

  function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * 100) + 1;
  }

  function reload(){
    setNumeroSecreto(gerarNumeroAleatorio())
  }

  function verificarPalpite() {
    const numero = parseInt(palpite);

    if (isNaN(numero)) {
      Alert.alert("Por favor, digite um número válido.");
      return;
    }

    if (numero < numeroSecreto) {
      setMensagem('Número muito baixo');
      setPalpite('')
    } else if (numero > numeroSecreto) {
      setMensagem('Número muito alto');
      setPalpite('')
    } else {
      setMensagem('🎉 Acertou!');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Acerte o Número (1 a 100)</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite seu palpite"
        placeholderTextColor={'#aaa'}
        value={palpite}
        onChangeText={setPalpite}
      />

      <Button title="Verificar" onPress={verificarPalpite} />

      {mensagem !== '' && (
        <Text style={styles.feedback}>{mensagem}</Text>
      )}

      <View style={styles.reload}>
        <Button title="Jogar Novamente" onPress={reload} />
      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color:'#cdf80cff'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    padding: 10,
    marginBottom: 10,
    fontSize: 18,
    borderRadius: 8,
  },
  feedback: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  reload: {
    width:'80%',
    position:'absolute',
    bottom:0,
    padding:15,
    marginBottom:35,
    borderWidth:1,
    borderColor:'#9c9c9c',
    borderRadius:10,
    backgroundColor: '#999',
  },


});
