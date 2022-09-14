import React from 'react';
import { FlatList, Image, View } from 'react-native';

import { styles } from './styles';
import logoImg from '../../assets/logo-nlw-esports.png';
import { GAMES } from '../../utils/games';

import { Heading, GameCard } from '../../components';

export const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={logoImg} defaultSource={logoImg} style={styles.logo} />
      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />
      <FlatList
        data={GAMES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GameCard data={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
};
