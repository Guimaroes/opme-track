import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={{ padding: 20 }}>
      <Button
        title="Registrar Entrega de Materiais"
        onPress={() => navigation.navigate('Registrar Entrega')}
      />
      <View style={{ marginBottom: 20 }}></View>
      <Button
        title="Ver Entregas Salvas"
        onPress={() => navigation.navigate('Entregas Salvas')}
      />
    </View>
  );
};

export default HomeScreen;