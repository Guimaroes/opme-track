import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Material {
    id: string;
    title: string;
}

// TODO: buscar materias no banco
const materials: Material[]  = [
    { id: '1', title: 'Material A' },
    { id: '2', title: 'Material B' },
    { id: '3', title: 'Material C' },
];

const RegisterDeliveryScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
    
    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [date, setDate] = useState<Date>(new Date());
    
    const [timePickerOpen, setTimePickerOpen] = useState(false)
    const [time, setTime] = useState<Date>(new Date());

    const saveDeliveryRecord = async (delivery: any) => {
        try {
            const existingDeliveries = await AsyncStorage.getItem('deliveries');
            const deliveries = existingDeliveries ? JSON.parse(existingDeliveries) : [];
            deliveries.push(delivery);
            await AsyncStorage.setItem('deliveries', JSON.stringify(deliveries));
            alert('Registro de entrega salvo com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar o registro:', error);
            alert('Erro ao salvar o registro.');
        }
    };

    const handleSubmit = async () => {
        console.log('Submit register delivery')
        
        if (!selectedMaterial || !date || !time) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const deliveryRecord = {
            materialId: selectedMaterial.id,
            materialTitle: selectedMaterial.title,
            deliveryDate: date.toLocaleDateString(),
            deliveryTime: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        };

        await saveDeliveryRecord(deliveryRecord);

        navigation.navigate('OPME Track');
    };

    return (
        <View style={styles.container}>
            <Text>Selecionar Material</Text>
            <Picker
                selectedValue={selectedMaterial?.id}
                onValueChange={(itemValue, itemIndex) => {
                    setSelectedMaterial(materials.find(material => material.id == itemValue) || null);
                }}
                style={styles.picker}
            >
                <Picker.Item key={'-1'} label={'Selecione um material'} value={null}/>
                {materials.map(material => (
                    <Picker.Item key={material.id} label={material.title} value={material.id} />
                ))}
            </Picker>
            <Text>Material selecionado: {selectedMaterial?.title || 'Nenhum'}</Text>

            <Button title="Selecionar data" onPress={() => setDatePickerOpen(true)} />
            {datePickerOpen && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setDatePickerOpen(false);
                        setDate(selectedDate || date);
                      }}
                />
            )}
            <Text>Data selecionada: {date.toLocaleDateString()}</Text>

            <Button title="Selecionar hora" onPress={() => setTimePickerOpen(true)} />
            {timePickerOpen && (
                <DateTimePicker
                    value={time}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                        setTimePickerOpen(false);
                        setTime(selectedTime || time);
                      }}
                />
            )}
            <Text>Hora selecionada: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>

            <Button title="Registrar" disabled={!selectedMaterial || !date || !time} onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    picker: {
        marginVertical: 10,
        padding: 10,
    },
}); 

export default RegisterDeliveryScreen;
