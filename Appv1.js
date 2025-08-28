import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";

export default function App() {
  const [numeroSecreto, setNumeroSecreto] = useState(0);
  const [palpite, setPalpite] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [jogoAtivo, setJogoAtivo] = useState(true);

  useEffect(() => {
    iniciarJogo();
  }, []);

  const iniciarJogo = () => {
    const novoNumero = Math.floor(Math.random() * 100) + 1; // 1 a 100
    setNumeroSecreto(novoNumero);
    setPalpite("");
    setMensagem("Tente adivinhar o número entre 1 e 100!");
    setJogoAtivo(true);
  };

  const verificarPalpite = () => {
    const numero = parseInt(palpite);

    if (isNaN(numero)) {
      setMensagem("Digite um número válido!");
      return;
    }

    if (numero < 1 || numero > 100) {
      setMensagem("O número deve estar entre 1 e 100!");
      return;
    }

    if (numero === numeroSecreto) {
      setMensagem("🎉 Acertou! O número era " + numeroSecreto);
      setJogoAtivo(false);
    } else if (numero < numeroSecreto) {
      setMensagem("📉 Muito baixo! Tente novamente.");
    } else {
      setMensagem("📈 Muito alto! Tente novamente.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.titulo}>🎮 Acerte o Número</Text>
      <Text style={styles.mensagem}>{mensagem}</Text>

      {jogoAtivo && (
        <>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Digite seu palpite"
            placeholderTextColor="#aaa"
            value={palpite}
            onChangeText={setPalpite}
          />

          <TouchableOpacity style={styles.botao} onPress={verificarPalpite}>
            <Text style={styles.textoBotao}>Chutar</Text>
          </TouchableOpacity>
        </>
      )}

      {!jogoAtivo && (
        <Text style={styles.finalTexto}>Clique em "Nova Partida" para jogar novamente.</Text>
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.botaoReiniciar} onPress={iniciarJogo}>
          <Text style={styles.textoBotao}>🔄 Nova Partida</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#f5c518",
  },
  mensagem: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  input: {
    borderWidth: 2,
    borderColor: "#f5c518",
    borderRadius: 10,
    width: "80%",
    padding: 10,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 15,
    color: "#fff",
    backgroundColor: "#333",
  },
  botao: {
    backgroundColor: "#f5c518",
    padding: 15,
    borderRadius: 10,
    width: "60%",
    alignItems: "center",
    marginBottom: 20,
  },
  textoBotao: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  finalTexto: {
    fontSize: 16,
    color: "#ccc",
    marginTop: 20,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 40 : 20, // sobe um pouco no iOS
    width: "100%",
    alignItems: "center",
  },
  botaoReiniciar: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
  },
});
