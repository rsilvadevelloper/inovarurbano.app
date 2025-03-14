import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

const produtos = [
  { id: '1', nome: 'Camiseta', preco: 49.99 },
  { id: '2', nome: 'Croche', preco: 49.99 },
  { id: '3', nome: 'Camiseta UV', preco: 59.99 },
  { id: '4', nome: 'Calça Jeans', preco: 99.99 },
  { id: '5', nome: 'Tênis', preco: 199.99 },
];

export default function HomeScreen({ navigation }) {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => [...prev, produto]);
    alert(`${produto.nome} adicionado ao carrinho!`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nome}</Text>
            <Text>R$ {item.preco.toFixed(2)}</Text>
            <Button
              title="Adicionar ao Carrinho"
              onPress={() => adicionarAoCarrinho(item)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
});


import { collection, getDocs } from 'firebase/firestore';
   import { db } from '../firebaseConfig';

   useEffect(() => {
     const fetchProdutos = async () => {
       const produtosSnapshot = await getDocs(collection(db, 'produtos'));
       const produtosList = produtosSnapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
       }));
       setProdutos(produtosList);
     };

     fetchProdutos();
   }, []);
