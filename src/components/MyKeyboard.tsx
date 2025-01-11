import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Styles} from '../styles/GlobalStyles';
import Guziki from './Button';
import {myColors} from '../styles/Colors';

export default function MyKeyboard() {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleNumberPress = (buttonValue: string) => {
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
    }
  };

  const handleOperations = (buttonValue: string) => {
    setOperation(buttonValue);
    setSecondNumber(firstNumber);
    setFirstNumber('');
  };

  const clear = () => {
    setFirstNumber('');
    setOperation('');
    setSecondNumber('');
    setResult(null);
  };

  const getResult = () => {
    switch (operation) {
      case '+':
        setResult(parseInt(secondNumber) + parseInt(firstNumber));
        break;
      case '-':
        setResult(parseInt(firstNumber) - parseInt(secondNumber));
        break;
      case '*':
        setResult(parseInt(firstNumber) * parseInt(secondNumber));
        break;
      case '/':
        if (parseInt(secondNumber) != 0) {
          setResult(parseInt(firstNumber) / parseInt(secondNumber));
        } else {
          setResult(null);
        }
        break;
      default:
        clear();
        return;
    }
    clear();
  };

  const firstNumberDisplay = () => {
    if (result !== null) {
      return (
        <Text
          style={
            result < 99999
              ? [Styles.screenFirstNumber, {color: myColors.result}]
              : [
                  Styles.screenFirstNumber,
                  {fontSize: 50, color: myColors.result},
                ]
          }>
          {result?.toString()}
        </Text>
      );
    }
    if (firstNumber === '') {
      return <Text style={Styles.screenFirstNumber}>{'0'} </Text>;
    }
    if (firstNumber.length > 7) {
      return (
        <Text style={[Styles.screenFirstNumber, {fontSize: 50}]}>
          {firstNumber}
        </Text>
      );
    }
  };

  return (
    <View style={Styles.viewBottom}>
      <View
        style={{
          height: 120,
          width: '90%',
          justifyContent: 'flex-end',
          alignContent: 'center',
        }}>
        <Text style={Styles.screenFirstNumber}>
          {secondNumber}
          <Text style={{color: 'purple', fontSize: 50, fontWeight: '500'}}>
            {operation}
          </Text>
        </Text>
        {firstNumberDisplay()}
      </View>
      <View style={Styles.row}>
        <Guziki title="C" isGrey onPress={clear} />
        <Guziki title="+/-" isGrey onPress={() => handleOperations('+/-')} />
        <Guziki title="%" isGrey onPress={() => handleOperations('%')} />
        <Guziki title="/" isBlue onPress={() => handleOperations('/')} />
      </View>
      <View style={Styles.row}>
        <Guziki title="7" onPress={() => handleNumberPress('7')} />
        <Guziki title="8" onPress={() => handleNumberPress('8')} />
        <Guziki title="9" onPress={() => handleNumberPress('9')} />
        <Guziki title="*" isBlue onPress={() => handleOperations('*')} />
      </View>
      <View style={Styles.row}>
        <Guziki title="4" onPress={() => handleNumberPress('4')} />
        <Guziki title="5" onPress={() => handleNumberPress('5')} />
        <Guziki title="6" onPress={() => handleNumberPress('6')} />
        <Guziki title="-" isBlue onPress={() => handleOperations('-')} />
      </View>
      <View style={Styles.row}>
        <Guziki title="1" onPress={() => handleNumberPress('1')} />
        <Guziki title="2" onPress={() => handleNumberPress('2')} />
        <Guziki title="3" onPress={() => handleNumberPress('3')} />
        <Guziki title="+" isBlue onPress={() => handleOperations('+')} />
      </View>
      <View style={Styles.row}>
        <Guziki title="0" onPress={() => handleNumberPress('0')} />
        <Guziki title="." onPress={() => handleNumberPress('.')} />
        <Guziki
          title="del"
          onPress={() => setFirstNumber(firstNumber.slice(0, -1))}
        />
        <Guziki title="=" isBlue onPress={getResult} />
      </View>
    </View>
  );
}
