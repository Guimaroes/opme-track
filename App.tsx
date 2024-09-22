import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RegisterDeliveryScreen from './screens/RegisterDeliveryScreen';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="OPME Track" component={HomeScreen} />
          <Stack.Screen name="Registrar Entrega" component={RegisterDeliveryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;