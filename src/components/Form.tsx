import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import RNFS from 'react-native-fs';

type FormScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Form'
>;

const FILE_PATH = `${RNFS.DocumentDirectoryPath}/formData.json`;
console.log('Plik został zapisany w:', FILE_PATH);

const Form = () => {
  const navigation = useNavigation<FormScreenNavigationProp>();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState('');
  const [hobbies, setHobbies] = useState<string[]>([]);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  const toggleHobby = (hobby: string) => {
    setHobbies(prev =>
      prev.includes(hobby)
        ? prev.filter(item => item !== hobby)
        : [...prev, hobby],
    );
  };

  const handleSubmit = () => {
    navigation.navigate('Summary', {
      firstName,
      lastName,
      city,
      street,
      houseNumber,
      birthDate,
      gender,
      hobbies,
    });
  };

  const saveData = async () => {
    const data = {
      firstName,
      lastName,
      city,
      street,
      houseNumber,
      birthDate: birthDate.toISOString(),
      gender,
      hobbies,
    };

    try {
      await RNFS.writeFile(FILE_PATH, JSON.stringify(data), 'utf8');
      Alert.alert('Sukces', 'Dane zostały zapisane.');
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się zapisać danych.');
      console.error(error);
    }
  };

  const loadData = async () => {
    try {
      const fileContent = await RNFS.readFile(FILE_PATH, 'utf8');
      const parsedData = JSON.parse(fileContent);

      setFirstName(parsedData.firstName || '');
      setLastName(parsedData.lastName || '');
      setCity(parsedData.city || '');
      setStreet(parsedData.street || '');
      setHouseNumber(parsedData.houseNumber || '');
      setBirthDate(new Date(parsedData.birthDate || new Date()));
      setGender(parsedData.gender || '');
      setHobbies(parsedData.hobbies || []);

      Alert.alert('Sukces', 'Dane zostały odczytane.');
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się odczytać danych.');
      console.error(error);
    }
  };

  const clearData = async () => {
    try {
      await RNFS.unlink(FILE_PATH);
      setFirstName('');
      setLastName('');
      setCity('');
      setStreet('');
      setHouseNumber('');
      setBirthDate(new Date());
      setGender('');
      setHobbies([]);

      Alert.alert('Sukces', 'Dane zostały wyczyszczone.');
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się wyczyścić danych.');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.label}>Imię:</Text>
        <TextInput
          style={styles.input}
          placeholder="Wpisz imię"
          value={firstName}
          onChangeText={setFirstName}
        />

        <Text style={styles.label}>Nazwisko:</Text>
        <TextInput
          style={styles.input}
          placeholder="Wpisz nazwisko"
          value={lastName}
          onChangeText={setLastName}
        />

        <Text style={styles.label}>Data urodzenia:</Text>
        <Text style={styles.input} onPress={() => setShowDatePicker(true)}>
          {birthDate.toLocaleDateString()}
        </Text>
        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        <Text style={styles.label}>Płeć:</Text>
        <Picker
          selectedValue={gender}
          onValueChange={itemValue => setGender(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Wybierz płeć" value="" />
          <Picker.Item label="Mężczyzna" value="male" />
          <Picker.Item label="Kobieta" value="female" />
          <Picker.Item label="Inna" value="other" />
        </Picker>

        <Text style={styles.label}>Miejscowość:</Text>
        <TextInput
          style={styles.input}
          placeholder="Wpisz miejscowość"
          value={city}
          onChangeText={setCity}
        />

        <Text style={styles.label}>Ulica:</Text>
        <TextInput
          style={styles.input}
          placeholder="Wpisz ulicę"
          value={street}
          onChangeText={setStreet}
        />

        <Text style={styles.label}>Nr domu:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nr domu"
          value={houseNumber}
          onChangeText={setHouseNumber}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Ulubione zajęcia:</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={hobbies.includes('Sport')}
            onValueChange={() => toggleHobby('Sport')}
          />
          <Text style={styles.checkboxLabel}>Sport</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={hobbies.includes('Muzyka')}
            onValueChange={() => toggleHobby('Muzyka')}
          />
          <Text style={styles.checkboxLabel}>Muzyka</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={hobbies.includes('Czytanie')}
            onValueChange={() => toggleHobby('Czytanie')}
          />
          <Text style={styles.checkboxLabel}>Czytanie</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={hobbies.includes('Podróże')}
            onValueChange={() => toggleHobby('Podróże')}
          />
          <Text style={styles.checkboxLabel}>Podróże</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text>Podsumowanie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={saveData}>
          <Text>Zapisz Dane</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={loadData}>
          <Text>Odczytaj Dane</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={clearData}>
          <Text>Wyczyść Dane</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  picker: {
    height: 40,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'gray',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    width: '80%',
    alignSelf: 'center',
  },
});

export default Form;
