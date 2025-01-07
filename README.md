# **Documentação do Aplicativo: Inovar Urbano**

## 1. **Visão Geral**

O **Inovar Urbano** é um aplicativo de moda e e-commerce focado em roupas urbanas. Desenvolvido com **Expo**, o aplicativo permite que os usuários explorem, comprem e visualizem roupas de diferentes estilos urbanos, com integração ao **Firebase** para gerenciar dados e autenticação de usuários.

## 2. **Tecnologias Utilizadas**

- **Expo**: Framework para desenvolvimento rápido de aplicativos móveis com React Native.
- **Firebase**: Backend para autenticação de usuários, banco de dados em tempo real (Firestore) e armazenamento de imagens.
- **JavaScript**: Linguagem principal para o desenvolvimento do aplicativo.
- **React Navigation**: Biblioteca para navegação dentro do aplicativo.
- **React Native Elements**: Conjunto de componentes reutilizáveis e estilosos para React Native.
- **Axios**: Para fazer chamadas HTTP para APIs externas, se necessário.

## 3. **Funcionalidades**

O aplicativo **Inovar Urbano** oferece as seguintes funcionalidades principais:

- **Autenticação de Usuário**: Cadastro, login e logout usando Firebase Authentication.
- **Catálogo de Roupas**: Exibição de roupas divididas por categorias como "Camisetas", "Calças", "Acessórios", etc. As informações são armazenadas no **Firestore**.
- **Carrinho de Compras**: Os usuários podem adicionar produtos ao carrinho, visualizar o total e realizar a compra.
- **Favoritos**: Permite que os usuários marquem itens como favoritos para compra futura.
- **Notificações Push**: Envio de notificações para informar aos usuários sobre promoções ou novos itens no catálogo.
- **Perfil de Usuário**: Gerenciamento do perfil de usuário, incluindo edição de dados pessoais e histórico de compras.

## 4. **Arquitetura do Projeto**

A estrutura do projeto é organizada da seguinte forma:

```
InovarUrbano/
│
├── assets/                    # Imagens e ícones do projeto
│   └── logo.png
│
├── components/                # Componentes reutilizáveis
│   ├── ProductCard.js
│   ├── Header.js
│   └── CartItem.js
│
├── navigation/                # Arquivos de navegação
│   ├── AppNavigator.js
│   └── BottomTabNavigator.js
│
├── screens/                   # Telas do aplicativo
│   ├── HomeScreen.js
│   ├── ProductDetailScreen.js
│   ├── CartScreen.js
│   └── ProfileScreen.js
│
├── services/                  # Arquivos de integração com Firebase e API
│   ├── firebase.js
│   └── api.js
│
├── App.js                     # Componente principal que contém a navegação e lógica do app
└── app.json                   # Configurações do Expo
```

## 5. **Fluxo de Navegação**

O fluxo de navegação é baseado no conceito de abas (Bottom Tabs), onde o usuário pode alternar entre diferentes seções do aplicativo.

### **Tela Principal (HomeScreen)**:
- Exibe uma lista de roupas em diferentes categorias (Camisetas, Calças, etc.).
- O usuário pode clicar em um item para visualizar os detalhes (ProductDetailScreen).

### **Tela de Detalhes do Produto (ProductDetailScreen)**:
- Exibe informações detalhadas sobre um produto, como descrição, preço, tamanho disponível, etc.
- O usuário pode adicionar o item ao **Carrinho**.

### **Tela de Carrinho (CartScreen)**:
- Exibe os produtos adicionados ao carrinho, com a opção de remover itens e visualizar o total.
- O usuário pode realizar o pagamento ou continuar comprando.

### **Tela de Perfil (ProfileScreen)**:
- Permite que o usuário visualize e edite seu perfil.
- Exibe histórico de compras e itens favoritos.

## 6. **Integração com Firebase**

### **Autenticação de Usuário**
A autenticação no Firebase é usada para permitir que os usuários se registrem e façam login no aplicativo.

#### Exemplo de integração com Firebase Authentication:

```javascript
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

// Função para criar conta
const createAccount = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Usuário criado:', user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
};

// Função para login
const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Usuário logado:', user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
};
```

### **Banco de Dados Firestore**
Os produtos e dados de usuários são armazenados no Firestore, um banco de dados NoSQL em tempo real.

#### Exemplo de leitura de produtos do Firestore:

```javascript
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore();

const getProducts = async () => {
  const productsCollection = collection(db, "products");
  const productsSnapshot = await getDocs(productsCollection);
  const productsList = productsSnapshot.docs.map(doc => doc.data());
  return productsList;
};
```

### **Armazenamento de Imagens no Firebase Storage**
As imagens dos produtos são armazenadas no Firebase Storage e recuperadas para exibição no app.

```javascript
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const getImageUrl = async (imagePath) => {
  const imageRef = ref(storage, imagePath);
  const url = await getDownloadURL(imageRef);
  return url;
};
```

## 7. **Extensões e Funcionalidades em JavaScript**

O aplicativo utiliza JavaScript para lidar com várias funcionalidades, como:

- **Manipulação de estados e dados com React Hooks** (ex: `useState`, `useEffect`).
- **Chamada de APIs externas** utilizando **Axios** para obter informações de promoções ou novos lançamentos de produtos.
- **Gestão de estado global** com **Context API** ou **Redux** (se o app crescer e precisar de uma gestão de estado mais robusta).

Exemplo de uso do `useState` e `useEffect`:

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { getProducts } from '../services/firebase';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  return (
    <View>
      <Text>Produtos</Text>
      {products.map((product, index) => (
        <View key={index}>
          <Text>{product.name}</Text>
          <Text>{product.price}</Text>
        </View>
      ))}
    </View>
  );
};

export default HomeScreen;
```

## 8. **Como Rodar o Projeto Localmente**

### **Passos para Iniciar o Projeto**

1. **Clone o repositório**:
   
   ```bash
   git clone https://github.com/usuario/inovar-urbano.git
   cd inovar-urbano
   ```

2. **Instale as dependências**:

   Se estiver usando `npm`:

   ```bash
   npm install
   ```

   Ou se estiver usando `yarn`:

   ```bash
   yarn install
   ```

3. **Inicie o servidor Expo**:

   ```bash
   expo start
   ```

4. Abra o aplicativo no seu celular escaneando o **QR code** exibido no terminal ou no navegador.

## 9. **Conclusão**

O aplicativo **Inovar Urbano** oferece uma experiência moderna de compra de roupas urbanas com uma integração simples e eficaz com o Firebase para autenticação e gerenciamento de dados. Usando o poder do **Expo** para desenvolvimento rápido e fácil, ele proporciona uma interface fluida e rica em funcionalidades.

---
