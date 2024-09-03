import React from 'react';
import {Pressable, Text} from 'react-native';
import {colors, globalStyles} from '../../config/theme/app-theme';

interface Props {
  label: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  isBig?: boolean;
}
export const CalculatorButton = ({
  label,
  onPress,
  backgroundColor = colors.darkGray,
  textColor,
  isBig = false,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => ({
        ...globalStyles.button,
        backgroundColor: backgroundColor,
        opacity: pressed ? 0.8 : 1,
        width: isBig ? 180 : 80,
      })}>
      <Text style={{...globalStyles.buttonLabel, color: textColor ?? 'white'}}>
        {label}
      </Text>
    </Pressable>
  );
};
