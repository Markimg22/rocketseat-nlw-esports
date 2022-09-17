import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import { Background, Duo, DuoCard, Heading, DuoMatch } from '../../components';
import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { THEME } from '../../theme';

import { GameParams } from '../../@types/@navigation';

export const Game: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [duos, setDuos] = useState<Duo[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] =
    useState<string>('Markimg22#8839');

  const game = route.params as GameParams;

  const handleGoBack = (): void => {
    navigation.goBack();
  };

  const getDiscordUser = (adsId: string): void => {
    fetch(`http://127.0.0.1:3000/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => {
        setDuos(data);
      });
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>
        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
        <Heading title={game.title} subtitle="Conecte-se e comece a joga!" />
        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[
            duos.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
};
