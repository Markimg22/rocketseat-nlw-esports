import React from 'react';
import { ImageBackground } from 'react-native';

import { styles } from './styles';
import backgroundImg from '../../assets/background-galaxy.png';

type Props = {
  children: React.ReactNode;
};

export const Background: React.FC<Props> = ({ children }) => {
  return (
    <ImageBackground
      source={backgroundImg}
      defaultSource={backgroundImg}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
};
