import React from 'react';
import { ColorValue, Text, View } from 'react-native';

import { THEME } from '../../theme';
import { styles } from './styles';

type Props = {
  label: string;
  value: string;
  colorValue?: ColorValue;
};

export const DuoInfo: React.FC<Props> = ({
  label,
  value,
  colorValue = THEME.COLORS.TEXT,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: colorValue }]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
};
