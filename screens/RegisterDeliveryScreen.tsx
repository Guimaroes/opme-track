import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

// TODO: buscar materias no banco
interface Material {
    id: string;
    title: string;
}

const materials: Material[]  = [
    { id: '1', title: 'Material A' },
    { id: '2', title: 'Material B' },
    { id: '3', title: 'Material C' },
];

const RegisterDeliveryScreen: React.FC = () => {
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
    
    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [date, setDate] = useState<Date>(new Date());
    
    const [timePickerOpen, setTimePickerOpen] = useState(false)
    const [time, setTime] = useState<Date>(new Date());

    const handleSubmit = async () => {
        console.log('Submit register delivery')
        
    if (!selectedMaterial || !date || !time) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

        // TODO: salvar entrega no banco
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
