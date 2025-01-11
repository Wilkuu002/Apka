import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import {
  createTable,
  insertItem,
  deleteItem,
  getItemsWithOptions,
  Item,
} from './src/database/SQlite storage';
import CheckBox from '@react-native-community/checkbox';

const App: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState<string>('');
  const [value, setValue] = useState<number>(0);
  const [columns, setColumns] = useState<string[]>(['id', 'name', 'value']);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    createTable();
    fetchItems();
  }, []);

  const fetchItems = () => {
    getItemsWithOptions(columns, filter ? `WHERE ${filter}` : '', [], setItems);
  };

  const addItem = () => {
    if (name && value) {
      insertItem(name, value);
      fetchItems();
      setName('');
      setValue(0);
    }
  };

  const removeItem = (id: number) => {
    deleteItem(id);
    fetchItems();
  };

  const toggleColumn = (column: string) => {
    setColumns(prevColumns =>
      prevColumns.includes(column)
        ? prevColumns.filter(col => col !== column)
        : [...prevColumns, column],
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Imie"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Wprowadz wartosc"
        value={value.toString()}
        onChangeText={text => setValue(parseInt(text, 10) || 0)}
        keyboardType="numeric"
      />
      <Button title="Dodaj item" onPress={addItem} />

      <View style={styles.columnSelector}>
        <Text>Select columns to display:</Text>
        {['id', 'name', 'value'].map(col => (
          <View key={col} style={styles.checkboxContainer}>
            <CheckBox
              value={columns.includes(col)}
              onValueChange={() => toggleColumn(col)}
            />
            <Text>{col}</Text>
          </View>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="np: value > 80"
        value={filter}
        onChangeText={setFilter}
      />
      <Button title="filtruj" onPress={fetchItems} />

      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.item}>
            {Object.entries(item).map(([key, value]) => (
              <Text key={key}>
                {key}: {String(value)}
              </Text>
            ))}
            {columns.includes('id') && (
              <Button title="Usun" onPress={() => removeItem(item.id)} />
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20},
  input: {borderWidth: 1, marginBottom: 10, padding: 5, borderRadius: 5},
  columnSelector: {marginBottom: 20},
  checkboxContainer: {flexDirection: 'row', alignItems: 'center'},
  item: {marginBottom: 10, padding: 10, borderWidth: 1, borderRadius: 5},
});

export default App;
