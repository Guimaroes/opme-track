import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Registrar Entrega de Materiais"
        onPress={() => navigation.navigate('Registrar Entrega')}
      />
    </View>
  );
};

export default HomeScreen;