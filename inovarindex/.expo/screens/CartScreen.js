import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

export default function CartScreen({ navigation }) {
  const [carrinho, setCarrinho] = useState([

    // Produtos podem ser adicionados dinamicamente
  ]);

  const total = carrinho.reduce((sum, item) => sum + item.preco, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho de Compras</Text>
      {carrinho.length === 0 ? (
        <Text>O carrinho está vazio.</Text>
      ) : (
        <>
          <FlatList
            data={carrinho}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>{item.nome}</Text>
                <Text>R$ {item.preco.toFixed(2)}</Text>
              </View>
            )}
          />
          <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
          <Button
            title="Finalizar Compra"
            onPress={() => navigation.navigate('Pagamento')}
          />
        </>
      )}
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
  item: {
    marginBottom: 10,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
