import React from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { THEME } from '../../theme';

export type GameCardProps = {
  id: string;
  name: string;
  ads: string;
  cover: ImageSourcePropType;
};

type Props = TouchableOpacityProps & {
  data: GameCardProps;
};

export const GameCard: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground style={styles.cover} source={data.cover}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.ads}>{data.ads} anúncios</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};
