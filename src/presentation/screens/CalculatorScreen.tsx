import React from 'react';
import {Text, View} from 'react-native';
import {colors, globalStyles} from '../../config/theme/app-theme';
import {CalculatorButton} from '../components/CalculatorButton';
import {useCalculator} from '../hooks/useCalculator';

export const CalculatorScreen = () => {
  const {
    number,
    prevNumber,
    buildNumber,
    clean,
    deleteOperation,
    toggleSign,
    addOperation,
    subtractOperation,
    multiplyOperation,
    divideOperation,
    calculateResult,
  } = useCalculator();
  return (
    <View style={globalStyles.calculatorContainer}>
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        style={globalStyles.mainResult}>
        {number}
      </Text>
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        style={globalStyles.subResult}>
        {prevNumber ?? ''}
      </Text>
      <View style={{gap: 10, justifyContent: 'center'}}>
        <View style={globalStyles.rowButtons}>
          <CalculatorButton
            onPress={() => clean()}
            label="C"
            backgroundColor={colors.lightGray}
            textColor="black"
          />
          <CalculatorButton
            onPress={toggleSign}
            label="+/-"
            backgroundColor={colors.lightGray}
            textColor="black"
          />
          <CalculatorButton
            onPress={deleteOperation}
            label="del"
            backgroundColor={colors.lightGray}
            textColor="black"
          />
          <CalculatorButton
            onPress={divideOperation}
            label="÷"
            backgroundColor={colors.orange}
          />
        </View>
        <View style={globalStyles.rowButtons}>
          <CalculatorButton onPress={() => buildNumber('7')} label="7" />
          <CalculatorButton onPress={() => buildNumber('8')} label="8" />
          <CalculatorButton onPress={() => buildNumber('9')} label="9" />
          <CalculatorButton
            onPress={multiplyOperation}
            label="x"
            backgroundColor={colors.orange}
          />
        </View>
        <View style={globalStyles.rowButtons}>
          <CalculatorButton onPress={() => buildNumber('4')} label="4" />
          <CalculatorButton onPress={() => buildNumber('5')} label="5" />
          <CalculatorButton onPress={() => buildNumber('6')} label="6" />
          <CalculatorButton
            onPress={subtractOperation}
            label="-"
            backgroundColor={colors.orange}
          />
        </View>
        <View style={globalStyles.rowButtons}>
          <CalculatorButton onPress={() => buildNumber('1')} label="1" />
          <CalculatorButton onPress={() => buildNumber('2')} label="2" />
          <CalculatorButton onPress={() => buildNumber('3')} label="3" />
          <CalculatorButton
            onPress={addOperation}
            label="+"
            backgroundColor={colors.orange}
          />
        </View>
        <View style={globalStyles.rowButtons}>
          <CalculatorButton onPress={() => buildNumber('0')} label="0" isBig />
          <CalculatorButton onPress={() => buildNumber('.')} label="." />
          <CalculatorButton onPress={calculateResult} label="=" />
        </View>
      </View>
    </View>
  );
};
