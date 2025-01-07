import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function CheckoutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagamento</Text>
      <WebView
        source={{ uri: 'https://www.pagseguro.uol.com.br' }} // Integre aqui com a URL da sua solução de pagamento.
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
