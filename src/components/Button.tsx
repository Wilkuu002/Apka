import React, {useContext, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {Styles} from '../styles/GlobalStyles';

interface ButtonProps {
  onPress: () => void;
  title: string;
  isBlue?: boolean;
  isGrey?: boolean;
}

export default function Guziki({title, onPress, isGrey, isBlue}: ButtonProps) {
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={
        isBlue
          ? Styles.btnBlue
          : isGrey
          ? Styles.btnGrey
          : theme === 'light'
          ? Styles.btnLight
          : Styles.btnDark
      }
      onPress={onPress}>
      <Text
        style={
          isBlue || isGrey
            ? Styles.smallTextLight
            : theme === 'dark'
            ? Styles.smallTextLight
            : Styles.smallTextDark
        }>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
