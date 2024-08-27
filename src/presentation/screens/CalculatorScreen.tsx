import React from 'react';
import {Text, View} from 'react-native';
import {globalStyles} from '../../config/theme/app-theme';

export const CalculatorScreen = () => {
  return (
    <View style={globalStyles.calculatorContainer}>
      <Text style={globalStyles.mainResult}>1500</Text>
      <Text style={globalStyles.subResult}>225</Text>
    </View>
  );
};
