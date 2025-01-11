// components/SummaryScreen.tsx

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../types';

type SummaryScreenRouteProp = RouteProp<RootStackParamList, 'Summary'>;

type Props = {
  route: SummaryScreenRouteProp;
};

const Summary: React.FC<Props> = ({route}) => {
  const {
    firstName,
    lastName,
    city,
    street,
    houseNumber,
    birthDate,
    gender,
    hobbies,
  } = route.params;

  return (
    <View style={styles.container}>
      <Text>Imię: {firstName}</Text>
      <Text>Nazwisko: {lastName}</Text>
      <Text>Miejscowość: {city}</Text>
      <Text>Ulica: {street}</Text>
      <Text>Nr domu: {houseNumber}</Text>
      <Text>Data urodzenia: {birthDate.toLocaleDateString()}</Text>
      <Text>Płeć: {gender}</Text>
      <Text>Ulubione zajęcia: {hobbies.join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default Summary;
