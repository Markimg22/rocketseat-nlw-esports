import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { styles } from './styles';
import { THEME } from '../../theme';

export const Loading: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={THEME.COLORS.PRIMARY} />
    </View>
  );
};
