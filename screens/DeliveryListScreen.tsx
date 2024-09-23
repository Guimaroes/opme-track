import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Delivery {
    materialId: string;
    materialTitle: string;
    deliveryDate: string;
    deliveryTime: string;
}

const DeliveryListScreen: React.FC = () => {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);

    const loadDeliveries = async () => {
        try {
            const savedDeliveries = await AsyncStorage.getItem('deliveries');
            if (savedDeliveries) {
                setDeliveries(JSON.parse(savedDeliveries));
            } else {
                setDeliveries([]);
            }
        } catch (error) {
            console.error('Erro ao carregar as entregas:', error);
        }
    };

    useEffect(() => {
        loadDeliveries();
    }, []);

    const renderItem = ({ item }: { item: Delivery }) => (
        <View style={styles.deliveryItem}>
            <Text style={styles.materialTitle}>{item.materialTitle}</Text>
            <Text>Data: {item.deliveryDate}</Text>
            <Text>Hora: {item.deliveryTime}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Entregas Salvas</Text>
            {deliveries.length > 0 ? (
                <FlatList
                    data={deliveries}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            ) : (
                <Text>Nenhuma entrega salva.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    deliveryItem: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 10,
        borderRadius: 5,
    },
    materialTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default DeliveryListScreen;
