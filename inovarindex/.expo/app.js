import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Catálogo') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Carrinho') {
              iconName = focused ? 'ios-cart' : 'ios-cart-outline';
            } else if (route.name === 'Pagamento') {
              iconName = focused ? 'ios-card' : 'ios-card-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Catálogo" component={HomeScreen} />
        <Tab.Screen name="Carrinho" component={CartScreen} />
        <Tab.Screen name="Pagamento" component={CheckoutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}